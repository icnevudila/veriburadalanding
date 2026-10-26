"""Local static preview with byte-range support for product-film chapters."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from functools import lru_cache
import gzip
import io
import re

ROOT = Path(__file__).resolve().parent.parent / 'public'

@lru_cache(maxsize=64)
def compressed_asset(path, modified):
    return gzip.compress(Path(path).read_bytes(), compresslevel=6, mtime=0)

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self):
        self.send_header('Accept-Ranges', 'bytes')
        super().end_headers()

    def send_head(self):
        self.range_remaining = None
        requested = self.headers.get('Range')
        path = Path(self.translate_path(self.path))
        if not requested and path.is_file() and path.suffix in {'.html', '.css', '.js', '.svg', '.json', '.txt', '.vtt'} and 'gzip' in self.headers.get('Accept-Encoding', ''):
            stat = path.stat()
            body = compressed_asset(str(path), stat.st_mtime_ns)
            self.send_response(200)
            self.send_header('Content-Type', self.guess_type(str(path)))
            self.send_header('Content-Encoding', 'gzip')
            self.send_header('Vary', 'Accept-Encoding')
            self.send_header('Content-Length', str(len(body)))
            self.send_header('Last-Modified', self.date_time_string(stat.st_mtime))
            self.send_header('Cache-Control', 'no-cache')
            self.end_headers()
            return io.BytesIO(body)
        if not requested or not path.is_file():
            return super().send_head()
        match = re.fullmatch(r'bytes=(\d*)-(\d*)', requested.strip())
        if not match:
            self.send_error(416)
            return None
        size = path.stat().st_size
        lo, hi = match.groups()
        start = int(lo) if lo else max(0, size - int(hi or size))
        end = min(int(hi) if lo and hi else size - 1, size - 1)
        if start >= size or end < start:
            self.send_response(416)
            self.send_header('Content-Range', f'bytes */{size}')
            self.end_headers()
            return None
        source = path.open('rb')
        source.seek(start)
        self.range_remaining = end - start + 1
        self.send_response(206)
        self.send_header('Content-Type', self.guess_type(str(path)))
        self.send_header('Content-Range', f'bytes {start}-{end}/{size}')
        self.send_header('Content-Length', str(self.range_remaining))
        self.send_header('Last-Modified', self.date_time_string(path.stat().st_mtime))
        self.end_headers()
        return source

    def copyfile(self, source, outputfile):
        if self.range_remaining is None:
            return super().copyfile(source, outputfile)
        remaining = self.range_remaining
        try:
            while remaining:
                data = source.read(min(65536, remaining))
                if not data:
                    break
                outputfile.write(data)
                remaining -= len(data)
        except (BrokenPipeError, ConnectionResetError):
            pass

if __name__ == '__main__':
    print('Veriburada preview: http://127.0.0.1:4173/', flush=True)
    ThreadingHTTPServer(('127.0.0.1', 4173), Handler).serve_forever()
