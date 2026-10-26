from pathlib import Path
p=Path('public/index.html');s=p.read_text(encoding='utf-8');s=s.replace('</head>','<link rel="stylesheet" href="product-motion.css"/></head>');s=s.replace('</body>','<script src="product-motion.js" defer></script></body>');p.write_text(s,encoding='utf-8')
