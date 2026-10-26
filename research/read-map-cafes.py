import xml.etree.ElementTree as ET,json
r=ET.parse('research/istanbul-small.osm').getroot();a=[]
for el in r:
 t={x.get('k'):x.get('v') for x in el.findall('tag')}
 if t.get('amenity')=='cafe' and t.get('name'):a.append({k:v for k,v in t.items() if k in ['name','phone','contact:phone','website','contact:website','addr:street','addr:housenumber']})
print(json.dumps(a[:20],ensure_ascii=False))
