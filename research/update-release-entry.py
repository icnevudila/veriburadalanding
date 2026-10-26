from pathlib import Path
p=Path('research/package-final.py');old=p.read_text();a=Path('research/package-static-archive.py')
if not a.exists():a.write_text(old)
p.write_text("from pathlib import Path\nimport runpy\nrunpy.run_path(str(Path(__file__).with_name('prepare-release.py')),run_name='__main__')\n")
