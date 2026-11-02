import test from "node:test";
import assert from "node:assert/strict";
import {unzipSync} from "fflate";
import {collectGalleryPngs} from "../lib/artwork-archive.mjs";
const image = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aS3sAAAAASUVORK5CYII=", "base64");
const preview = new Blob([image], {type:"image/png"});
test("exports flattened PNG bytes from the active profile; skips legacy entries and keeps duplicate names distinct",async()=>{
  const gallery=[{id:"a",name:"Mój / lis"},{id:"old",image:"/template.webp"},{id:"b",name:"Mój / lis"},{id:"a"}];
  const read=async(profile,id)=>{
    assert.equal(profile,"child-a");
    return id==="old"?null:{preview,layer:new Blob(["paint only"])};
  };
  const result=await collectGalleryPngs("child-a",gallery,{read});
  assert.equal(result.count,2);assert.equal(result.missing,1);
  const files=unzipSync(new Uint8Array(await result.blob.arrayBuffer()));
  assert.deepEqual(Object.keys(files),["01-Mój-lis.png","02-Mój-lis.png"]);
  for(const bytes of Object.values(files)) assert.deepEqual(Buffer.from(bytes),image);
});
test("empty galleries have no download and a database error does not produce an incomplete ZIP",async()=>{
  assert.equal((await collectGalleryPngs("child",[])).blob,null);
  await assert.rejects(collectGalleryPngs("child",[{id:"a"},{id:"b"}],{read:async(_,id)=>{
    if(id==="b")throw new Error("storage error");return {preview};
  }}),/storage error/);
});
