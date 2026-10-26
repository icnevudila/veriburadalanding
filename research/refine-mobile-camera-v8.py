from pathlib import Path
p=Path('research/product-film-v8.html');s=p.read_text();s=s.replace(' const point={x:dx+'," const camera=mobile?1+.45*S((t-2.8)/.8)*(1-S((t-6.4)/.7))*(1-reset):1;q('.workspace').style.transformOrigin='50% 0';q('.workspace').style.transform=`scale(${camera})`;\n const point={x:dx+")
s=s.replace("(t<4.2||t>8.4?1:0)","(t<(mobile?2.8:4.2)||t>8.4?1:0)")
s=s.replace('</style></head>','@media(max-width:1000px){.table-row{font-size:24px}.table-row strong{font-size:28px}.table-row small{font-size:18px}.table-header{font-size:18px}.field label{font-size:18px}.field-value{font-size:24px}} </style></head>')
p.write_text(s)
p=Path('research/render-film-v8.cjs');s=p.read_text().replace('for(const mobile of[false,true])','for(const mobile of(process.argv.includes(\'--mobile\')?[true]:[false,true]))');p.write_text(s)
