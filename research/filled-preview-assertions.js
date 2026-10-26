const data=pm.response.json();
pm.test('Local demo responds successfully',()=>pm.expect(pm.response.code).to.eql(200));
pm.test('Explicit demo and first-five cap remain',()=>{pm.expect(data.demo).to.eql(true);pm.expect(data.shown).to.eql(5);pm.expect(data.results).to.have.length(5);pm.expect(data.remaining).to.eql(12)});
pm.test('All requested preview fields are filled',()=>data.results.forEach(r=>{pm.expect(r.phone).to.match(/000/);pm.expect(r.website).to.contain('.example');pm.expect(r.address).to.contain('Örnek Sokak');pm.expect(r.rating).to.be.within(0,5);pm.expect(r.location.latitude).to.be.a('number')}));
pm.test('Missing membership is not faked',()=>pm.expect(data.signupUrl).to.eql(null));
