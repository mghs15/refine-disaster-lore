const fs = require('fs');
const muni = require('./muni.js');

const text = fs.readFileSync("./20250424.geojson", "utf8");
const features = JSON.parse(text).features;

let csv = `ID,碑名,市町村コード,都道府県,市区町村,建立年,公開年,災害発生年` + "\n";

features.forEach( f => {
  const p = f.properties;
  const id = p.ID;
  const name = p["碑名"];
  const muniId = id.split("-")[0].padStart(5, "0");
  const muniName = muni.muniDataset[muniId].name;
  const prefName = muni.prefNames[muniId.substring(0, 2)];
  
  let build;
  const m1 = p["建立年"].match(/\d\d\d\d/);
  if(m1){
    build = m1[0];
  }else{
    //console.log(p["建立年"]);
    build = "0000";
  }
  
  let saigai;
  const m = p["災害名"].match(/\d\d\d\d/);
  if(m){
    saigai = m[0];
  }else{
    //console.log(p["災害名"]);
    saigai = "0000";
  }
  
  const koukai = p["公開日"];
  const line = `${id},"${name}",${muniId},${prefName},${muniName},${build},${koukai},${saigai}` + "\n";
  csv += line;
});

const bom = '\uFEFF';

fs.writeFileSync('disaster-lore.csv', bom + csv, 'utf8');



