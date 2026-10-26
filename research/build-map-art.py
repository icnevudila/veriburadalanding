"""Purpose-styled local Istanbul map from a small OpenStreetMap data extract.
Data remains attributed; business records on the landing are illustrative.
"""
from pathlib import Path
from xml.etree import ElementTree as ET
from html import escape
import json

ROOT = Path(__file__).resolve().parent.parent
data = ET.parse(ROOT / 'research/istanbul-small.osm').getroot()
nodes = {n.get('id'): (float(n.get('lon')), float(n.get('lat'))) for n in data.findall('node')}
W, H = 1400, 1200
WEST, EAST, SOUTH, NORTH = 28.975, 28.995, 41.025, 41.04
def xy(lon, lat):
    return ((lon-WEST)/(EAST-WEST)*W, (NORTH-lat)/(NORTH-SOUTH)*H)
def geom(refs):
    return [xy(*nodes[r]) for r in refs if r in nodes]
def path(points, close=False):
    return 'M'+'L'.join(f'{x:.1f},{y:.1f}' for x,y in points)+('Z' if close else '')
ways=[]
for w in data.findall('way'):
    refs=[n.get('ref') for n in w.findall('nd')]
    tags={t.get('k'):t.get('v') for t in w.findall('tag')}
    pts=geom(refs)
    if len(pts)>1:ways.append((refs,tags,pts))

coasts=[list(refs) for refs,tags,pts in ways if tags.get('natural')=='coastline']
coast=coasts.pop(0)
while coasts:
    for i,candidate in enumerate(coasts):
        if coast[-1]==candidate[0]:coast+=candidate[1:];coasts.pop(i);break
        if coast[0]==candidate[-1]:coast=candidate[:-1]+coast;coasts.pop(i);break
    else:break

svg=[f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" role="img" aria-labelledby="title desc">',
 '<title id="title">Beyoğlu, Tophane ve İstanbul kıyısı</title>',
 '<desc id="desc">OpenStreetMap coğrafi verisinden Veriburada için hazırlanmış özel harita görseli. İşletme kayıtları bu haritadan ayrı temsili gösterimdir.</desc>',
 '<defs><linearGradient id="sea" x2="1" y2="1"><stop stop-color="#CDEBE7"/><stop offset="1" stop-color="#BCE2DF"/></linearGradient><filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".6" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".025"/></feComponentTransfer><feBlend in="SourceGraphic" mode="multiply"/></filter></defs>',
 '<rect width="1400" height="1200" fill="#F0F4EE"/>']

# Parks and squares.
svg.append('<g fill="#D8E8D5" stroke="#CFE1CC" stroke-width="1.4">')
for refs,tags,pts in ways:
    if tags.get('leisure') in ('park','garden') or tags.get('landuse') in ('grass','forest'):
        svg.append(f'<path d="{path(pts,True)}"/>')
svg.append('</g>')

# Building footprints, with the smallest details left in their geographic place.
svg.append('<g fill="#E2E9DE" stroke="#D7E1D2" stroke-width=".65" stroke-linejoin="round">')
building_count=0
for refs,tags,pts in ways:
    if 'building' in tags:
        svg.append(f'<path d="{path(pts,True)}"/>');building_count+=1
svg.append('</g>')

# Roads have a consistent hierarchy; labels are intentionally curated below.
road_styles={
 'footway':(2.0,'#FAFCF8'),'steps':(2.0,'#FAFCF8'),'path':(2.0,'#FAFCF8'),
 'service':(4.0,'#FFFFFF'),'residential':(6.5,'#FFFFFF'),'living_street':(6.5,'#FFFFFF'),
 'pedestrian':(8.0,'#FBFCF8'),'unclassified':(7.0,'#FFFFFF'),
 'tertiary':(10.0,'#FFFFFF'),'secondary':(13.0,'#FFFEFA'),'secondary_link':(10.0,'#FFFEFA'),
 'primary':(18.0,'#FFFDF3'),'primary_link':(13.0,'#FFFDF3'),'busway':(8.0,'#FFFDF3')}
roads=[]
for refs,tags,pts in ways:
    kind=tags.get('highway')
    if kind in road_styles:roads.append((tags,pts,*road_styles[kind]))
svg.append('<g fill="none" stroke-linecap="round" stroke-linejoin="round">')
for tags,pts,width,color in sorted(roads,key=lambda r:r[2]):
    if width>=6:svg.append(f'<path d="{path(pts)}" stroke="#D4DFCE" stroke-width="{width+2.2}"/>')
    svg.append(f'<path d="{path(pts)}" stroke="{color}" stroke-width="{width}"/>')
svg.append('</g>')

# Coastline separates land and sea using the connected OSM shoreline.
water_pts=geom(coast)+[(2100,-900),(2100,2100),(-900,2100)]
svg.append(f'<path d="{path(water_pts,True)}" fill="url(#sea)"/>')
svg.append(f'<path d="{path(geom(coast))}" fill="none" stroke="#A7CFBF" stroke-width="3"/>')

# Selected geographic labels, all placed independently of the example businesses.
labels=[('BEYOĞLU',28.9786,41.0336,19,'#778E77',4),('CİHANGİR',28.986,41.0318,17,'#81957D',3),('TOPHANE',28.9822,41.0268,16,'#81957D',3),('TAKSİM',28.986,41.0375,18,'#778E77',4),('FINDIKLI',28.9914,41.0326,14,'#8DA18B',2)]
svg.append('<g font-family="Inter,Arial,sans-serif" text-anchor="middle">')
for text,lon,lat,size,color,tracking in labels:
    x,y=xy(lon,lat);svg.append(f'<text x="{x:.1f}" y="{y:.1f}" font-size="{size}" font-weight="550" letter-spacing="{tracking}" fill="{color}">{escape(text)}</text>')
x,y=xy(28.9930,41.0273)
svg.append(f'<text x="{x:.1f}" y="{y:.1f}" transform="rotate(-43 {x:.1f} {y:.1f})" fill="#7FB4AE" font-size="16" letter-spacing="6">İSTANBUL BOĞAZI</text>')
svg.append('</g>')
svg.append('<g fill="none" stroke="#A1CAC4" stroke-width="1.5" stroke-dasharray="8 11" opacity=".65"><path d="M1120 1150Q1040 900 1370 720"/><path d="M1270 1190Q1200 950 1450 840"/></g>')
svg.append('</svg>')
target=ROOT/'public/istanbul-map-art.svg';target.write_text(''.join(svg),encoding='utf-8')
(ROOT/'research/map-art-metadata.json').write_text(json.dumps({'source':'OpenStreetMap API read-only bounding box extract','bounds':[WEST,SOUTH,EAST,NORTH],'buildings':building_count,'roads':len(roads),'bytes':target.stat().st_size},indent=2),encoding='utf-8')
print(target.name,building_count,'buildings',len(roads),'roads',target.stat().st_size,'bytes')
