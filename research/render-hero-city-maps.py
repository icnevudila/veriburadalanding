"""Locally styled map artwork from four small, attributed OSM data extracts.
No remote tile server is used by the landing or this renderer.
"""
from pathlib import Path
from xml.etree import ElementTree as ET
from PIL import Image, ImageDraw, ImageFont
import json, math

root=Path(__file__).resolve().parent.parent
areas={
 'kadikoy':((29.024,40.984,29.044,41.001),'KADIKÖY'),
 'cankaya':((32.842,39.905,32.867,39.924),'ÇANKAYA'),
 'alsancak':((27.135,38.428,27.155,38.445),'ALSANCAK'),
 'nilufer':((28.975,40.210,29.002,40.230),'NİLÜFER'),
}
W,H=1600,1200
metadata={}
for name,(bounds,label) in areas.items():
 west,south,east,north=bounds
 data=ET.parse(root/'research'/f'hero-{name}.osm').getroot()
 nodes={n.get('id'):(float(n.get('lon')),float(n.get('lat'))) for n in data.findall('node')}
 def xy(lon,lat):return ((lon-west)/(east-west)*W,(north-lat)/(north-south)*H)
 ways=[]
 for way in data.findall('way'):
  tags={t.get('k'):t.get('v') for t in way.findall('tag')}
  refs=[n.get('ref') for n in way.findall('nd')]
  pts=[xy(*nodes[r]) for r in refs if r in nodes]
  if len(pts)>1:ways.append((tags,pts))
 image=Image.new('RGB',(W,H),'#F0F4EC');draw=ImageDraw.Draw(image)
 for tags,pts in ways:
  if tags.get('natural')=='water' or tags.get('waterway')=='riverbank':draw.polygon(pts,fill='#BADBE7')
  elif tags.get('leisure') in ['park','garden','pitch'] or tags.get('landuse') in ['grass','forest','recreation_ground']:
   draw.polygon(pts,fill='#D4E3C9',outline='#C9DCBD')
  elif tags.get('landuse') in ['residential','commercial','retail']:draw.polygon(pts,fill='#EDF1E8')
 for tags,pts in ways:
  if 'building' in tags:draw.polygon(pts,fill='#E0E6DA',outline='#D6DFCF')
 styles={'footway':2,'path':2,'steps':2,'service':4,'living_street':6,'residential':7,'unclassified':7,'pedestrian':9,'tertiary':11,'tertiary_link':8,'secondary':15,'secondary_link':10,'primary':21,'primary_link':12,'trunk':25,'trunk_link':13,'motorway':27,'motorway_link':14}
 roads=[(tags,pts,styles[tags['highway']]) for tags,pts in ways if tags.get('highway') in styles]
 candidates=[]
 for tags,pts,width in sorted(roads,key=lambda x:x[2]):
  if width>5:draw.line(pts,fill='#CFDAC8',width=width+3,joint='curve')
  draw.line(pts,fill='#FFFDF5' if width>=15 else '#FEFFFC',width=width,joint='curve')
  if width>=6:
   candidates.extend([p for p in pts if 70<p[0]<W-70 and 150<p[1]<H-70])
 # Ocean-side coastlines are closed to the west edge for these two coastal areas.
 if name in ['kadikoy','alsancak']:
  parts=[pts[:] for tags,pts in ways if tags.get('natural')=='coastline']
  if parts:
   coast=max(parts,key=len)
   rest=[p for p in parts if p is not coast]
   for _ in range(len(parts)+2):
    found=False
    for part in rest[:]:
     if math.dist(coast[-1],part[0])<2:coast+=part[1:]
     elif math.dist(coast[-1],part[-1])<2:coast+=part[-2::-1]
     elif math.dist(coast[0],part[-1])<2:coast=part[:-1]+coast
     elif math.dist(coast[0],part[0])<2:coast=part[:0:-1]+coast
     else:continue
     rest.remove(part);found=True
    if not found:break
   if len(coast)>1:
    if coast[0][1]>coast[-1][1]:coast.reverse()
    water=coast+ [(-250,coast[-1][1]+400),(-250,coast[0][1]-400)]
    draw.polygon(water,fill='#B7D9E9');draw.line(coast,fill='#A4C8DA',width=3)
 font=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',30)
 draw.text((W*.53,H*.49),label,font=font,fill='#82967C',anchor='mm',stroke_width=2,stroke_fill='#F0F4EC')
 targets=[(.23,.39),(.43,.57),(.70,.38),(.77,.72),(.37,.78)]
 pins=[]
 for nx,ny in targets:
  best=min(candidates,key=lambda p:(p[0]-nx*W)**2+(p[1]-ny*H)**2+sum(40000 if math.dist(p,q)<150 else 0 for q in pins))
  pins.append(best)
 out=root/'public/media'/f'hero-map-{name}.webp';image.save(out,'WEBP',quality=92,method=6)
 metadata[name]={'bounds':bounds,'size':[W,H],'pins':[[round(x,1),round(y,1)] for x,y in pins],'roads':len(roads),'source':'https://www.openstreetmap.org/copyright','path':'/media/'+out.name}
 print(name,len(roads),'roads',out.stat().st_size,'bytes')
(root/'research/hero-city-maps.json').write_text(json.dumps(metadata,indent=2),encoding='utf-8')
