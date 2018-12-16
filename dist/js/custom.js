if(window.location.hash){var hash=window.location.hash.substr(1)}else{var hash=1}
function getSum(total,num){return Number(total)+Number(num)}
function selectrune(data,mode){switch(data){case '1':if(mode==1){x=11}
break;case '2':if(mode==2){x=22}
break;case '3':if(mode==2){x=40}
break;case '4':if(mode==2){x=30}
break;default:x=0
break}
return x}
function toggleCollapse(){this.classList.toggle("active");var content=this.nextElementSibling;if(content.style.maxHeight){content.style.maxHeight=null;content.style.border='0 solid darkgray'}else{content.style.maxHeight=content.scrollHeight+"px";content.style.border='1px solid darkgray'}
var parent=document.getElementById('parentcontent')
if(content!=parent){if(parent.style.maxHeight){parent.style.maxHeight=String(Number(parent.scrollHeight)+Number(content.scrollHeight))+"px"}}}
function assignCollapse(){var coll=document.getElementsByClassName("collapsible");var i;for(i=0;i<coll.length;i++){coll[i].addEventListener("click",toggleCollapse)}}
function unassignCollapse(){var coll=document.getElementsByClassName("collapsible");var i;for(i=0;i<coll.length;i++){coll[i].removeEventListener("click",toggleCollapse)}}
function hasClass(el,className){if(el.classList)
return el.classList.contains(className);return!!el.className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))}
function addClass(el,className){if(el.classList)
el.classList.add(className)
else if(!hasClass(el,className))
el.className+=" "+className}
function removeClass(el,className){if(el.classList)
el.classList.remove(className)
else if(hasClass(el,className)){var reg=new RegExp('(\\s|^)'+className+'(\\s|$)');el.className=el.className.replace(reg,' ')}}
var jsonval=[]
var app
var heronames={"Kasel":"1","Frey":"2","Cleo":"3","Roi":"4","Gau":"5","Phillop":"6","Lakrak":"7","Kaulah":"8","Epis":"9","Selene":"10","Maria":"11","Miruru":"12","Lorraine":"13","Clause":"15","Rephy":"16","Dimael":"17","Reina":"18","Pavel":"19","Demia":"20","Naila":"21","Rodina":"22","Morrah":"23","Baudouin":"24","Jane":"25","Aisha":"26","Leo":"27","Fluss":"28","Luna":"29","Laias":"30","Arch":"31","Lewisia":"32","Nyx":"33","Annette":"34","Mitra":"35","Ricardo":"36","Tanya":"37","Ezekiel":"38","Cassandra":"39","Theo":"40","Mediana":"41","Oddy":"42","Viska":"43","Priscilla":"44","Yanne":"45","Zafir":"46","Ophelia":"49","Requina":"50","Aselica":"51","Crow":"52","Shamilla":"53","Seria":"55","Erze":"56","Lilia":"57","Laudia":"58","Lucias":"59","Chrisha":"60","Neraxis":"61","Scarlet":"62","Sonia":"63","Artemia":"64","Mirianne":"65","Shea":"66","Kara":"67","Nia":"68","Chase":"73","May":"90","Gladi":"91","Veronica":"92","Loman":"93","Juno":"94","Nicky":"95"}
console.log('waiting for json')
$.getJSON("data/hero.json").done(function(data){jsonval=data['0']
console.log('yes')
setVue()});function setVue(){var post=Vue.component('hero',{props:['post','hero'],data:function(){return{c:0}},template:'<div v-if="(post.ally == 1 && post.id != hero) || (post.ally != 1 && post.id == hero)">\
                    <button class="collapsible" v-bind:id="post.id">{{ matchName(post.id) }}</button>\
                    <div class="content">\
                    <div v-if="checkAvail(post.uw, 0)">\
                    UW: <select v-on:change="selUW(0 + post.ally + post.id)" v-bind:id="0 + post.ally + post.id">\
                    <option value="">Please select</option>\
                    <option v-for="(uw, star) in post.uw" v-bind:value="uw">{{star}} star: <span v-if="uw[0] != 0">ATK {{ uw[0] }}%</span><span v-if="uw[1] != 0"> CDMG {{ uw[1] }}%</span><span v-if="uw[2] != 0"> Flat ATK {{ uw[2] }}</span></option>\
                    </select>\
                    </div>\
                    \
                    <div v-if="checkAvail(post.t5, 0)">\
                    T5:\
                    <input type="checkbox" v-bind:id="String(51) + post.ally + post.id" v-bind:value="post.t5[1]" v-on:click="clickT5(String(51) + post.ally + post.id)">\
                    <label class="clickLabel" v-bind:for="String(51) + post.ally + post.id">Light: <span v-if="post.t5[1][0] != 0">ATK {{ post.t5[1][0] }}%</span><span v-if="post.t5[1][1] != 0"> CDMG {{ post.t5[1][1] }}%</span><span v-if="post.t5[1][2] != 0"> Flat ATK {{ post.t5[1][2] }}</span></label>\
                    <input type="checkbox" v-bind:id="String(52) + post.ally + post.id" v-bind:value="post.t5[2]" v-on:click="clickT5(String(52) + post.ally + post.id)">\
                    <label class="clickLabel" v-bind:for="String(52) + post.ally + post.id">Dark: <span v-if="post.t5[2][0] != 0">ATK {{ post.t5[2][0] }}%</span><span v-if="post.t5[2][1] != 0"> CDMG {{ post.t5[2][1] }}%</span><span v-if="post.t5[2][2] != 0"> Flat ATK {{ post.t5[2][2] }}</span></label>\
                    </div>\
                    \
                    <div v-for="(skill, skillno) in post.data" v-bind:key="skillno + post.ally + post.id" v-if="checkAvail(skill, 0)">\
                    <label>Skill: {{ skillno }}</label>\
                    <span><input type="checkbox" v-on:click="onClick(1 + skillno + post.ally + post.id, skill[1], post.id)" v-bind:value="skill[1]" v-bind:id="1 + skillno + post.ally + post.id" v-bind:ref="1 + skillno + post.ally + post.id">\
                        <label class="clickLabel" v-bind:for="1 + skillno + post.ally + post.id" v-bind:id="11 + skillno + post.ally + post.id">Base skill: <span v-if="skill[1][0] != 0">ATK {{ skill[1][0] }}%</span><span v-if="skill[1][1] != 0"> CDMG {{ skill[1][1] }}%</span><span v-if="skill[1][2] != 0"> Flat ATK {{ skill[1][2] }}</span></label></span><br>\
                    <span><input type="checkbox" v-on:click="onClick(2 + skillno + post.ally + post.id, skill[2], post.id)" v-bind:value="skill[2]" v-bind:id="2 + skillno + post.ally + post.id" v-bind:ref="2 + skillno + post.ally + post.id">\
                        <label class="clickLabel disable" v-bind:for="2 + skillno + post.ally + post.id" v-bind:id="22 + skillno + post.ally + post.id">Light perk: <span v-if="skill[2][0] != 0">ATK {{ skill[2][0] }}%</span><span v-if="skill[2][1] != 0"> CDMG {{ skill[2][1] }}%</span><span v-if="skill[2][2] != 0"> Flat ATK {{ skill[2][2] }}</span></label></span><br>\
                    <span><input type="checkbox" v-on:click="onClick(3 + skillno + post.ally + post.id, skill[3], post.id)" v-bind:value="skill[3]" v-bind:id="3 + skillno + post.ally + post.id" v-bind:ref="3 + skillno + post.ally + post.id">\
                        <label class="clickLabel disable" v-bind:for="3 + skillno + post.ally + post.id" v-bind:id="33 + skillno + post.ally + post.id">Dark perk: <span v-if="skill[3][0] != 0">ATK {{ skill[3][0] }}%</span><span v-if="skill[3][1] != 0"> CDMG {{ skill[3][1] }}%</span><span v-if="skill[3][2] != 0"> Flat ATK {{ skill[3][2] }}</span></label></span><br>\
                    <div v-if="checkAvail(skill[4], 0)">\
                    UT: <select v-on:change="selUT(9 + skillno + post.ally + post.id, skillno)" v-bind:id="9 + skillno + post.ally + post.id">\
                    <option value="">No UT</option>\
                    <option v-for="(ut, star) in skill[4]" v-bind:value="ut">{{star}} star: <span v-if="ut[0] != 0">ATK {{ ut[0] }}%</span><span v-if="ut[1] != 0"> CDMG {{ ut[1] }}%</span><span v-if="ut[2] != 0"> Flat ATK {{ ut[2] }}</span></option>\
                    </select>\
                    </div>\
                    </div>\
                    </div>\
                    </div>',methods:{selUW:function(id){var data
data=document.getElementById(id).value
data=data.split(",")
if(data[0]!=""){this.$emit('selected',data,id)}else{this.$emit('selected',[0,0,0],id)}},clickT5:function(id){var data
if(document.getElementById(id).checked){data=document.getElementById(id).value
data=data.split(",")
if(data[0]!=""){this.$emit('clickedt5',data)}else{this.$emit('clickedt5',[0,0,0])}}else{data=document.getElementById(id).value
data=data.split(",")
newdata=[-data[0],-data[1],-data[2]]
if(newdata[0]!=""){this.$emit('clickedt5',newdata)}else{this.$emit('clickedt5',[0,0,0])}}},selUT:function(id,utno){var data
data=document.getElementById(id).value
data=data.split(",")
if(data[0]!=""){this.$emit('selectedut',data,id,utno)}else{this.$emit('selectedut',[0,0,0],id,utno)}},onClick:function(id,data,parent){if(document.getElementById(id).checked){if(id.charAt(0)==2||id.charAt(0)==3){parentid=1+id.substr(1)
if(document.getElementById(parentid).checked){this.$emit('clicked',data)
return this.c++}else{document.getElementById(id).checked=!1}}
if(id.charAt(0)==1){this.$emit('clicked',data)
commonid=id.substr(1)
document.getElementById(2+commonid).checked=!1
document.getElementById(3+commonid).checked=!1
removeClass(document.getElementById(22+commonid),'disable')
removeClass(document.getElementById(33+commonid),'disable')
addClass(document.getElementById(parent),'selected')
return this.c++}}else{if(id.charAt(0)==2||id.charAt(0)==3){parentid=1+id.substr(1)
if(document.getElementById(parentid).checked){newdata=[-data[0],-data[1],-data[2]]
this.$emit('clicked',newdata)
return this.c--}else{document.getElementById(id).checked=!0}}
if(id.charAt(0)==1){newdata=[-data[0],-data[1],-data[2]]
this.$emit('clicked',newdata)
commonid=id.substr(1)
if(document.getElementById(2+commonid).checked){document.getElementById(id).checked=!0
document.getElementById(2+commonid).click()
document.getElementById(id).checked=!1}
if(document.getElementById(3+commonid).checked){document.getElementById(id).checked=!0
document.getElementById(3+commonid).click()
document.getElementById(id).checked=!1}
addClass(document.getElementById(22+commonid),'disable')
addClass(document.getElementById(33+commonid),'disable')
removeClass(document.getElementById(parent),'selected')
return this.c--}}},checkAvail:function(object,verbose){x=!0
if(verbose){console.log(object)}
if(!isNaN(object[0])){var sum=Number(object[0])+Number(object[1])+Number(object[2])
if(sum!=0){x=!1}}else{for(const key in object){if(object.hasOwnProperty(key)){const element=object[key];if(!Array.isArray(element[0])){var sum=element.reduce(getSum);if(sum!=0){x=!1}}else{for(let index=0;index<element.length;index++){element[index].reduce(getSum);if(sum!=0){x=!1}}}}}}
return!x},matchName:function(id){var x='undefined'
for(key in heronames){if(heronames.hasOwnProperty(key)){element=heronames[key];if(id==element){x=key
break}}}
return x}}})
app=new Vue({el:'#app',data:{testvar:0,cl:'1',tier:'8',star:'0',uw_rune_1:0,uw_rune_2:0,armor_line:'4',armor_enc_1:0,armor_enc_2:0,armor_rune_1:'-',armor_rune_2:'-',subarmor_line:'4',subarmor_enc_1:0,subarmor_enc_2:0,subarmor_rune_1:'-',subarmor_rune_2:'-',ear:'1',acc_line:'4',acc_enc_1:0,acc_enc_2:0,orb_line:'4',orb_enc_1:0,orb_enc_2:0,ut1_1:0,ut1_2:0,ut2_1:0,ut2_2:0,ut3_1:0,ut3_2:0,art_1:0,art_2:0,art_3:0,scale:0,addatk:0,addcdmg:0,Fa:0,skillatk:0,skillcdmg:0,skillfa:0,hero:hash,uwtemp:{},uttemp:{},posts:jsonval,heronames:heronames,perk1:!1,perk2:[],wa2:0,obs:0,heroscale:1},computed:{earring:function(){if(this.tier==8){return 23702}else if(this.tier==7){return 18926}else{return 13291}},base:function(){if(this.cl==1){return 17632}else if(this.cl==2){return 20032}else if(this.cl==3){return 24824}else if(this.cl==4){return 21992}else if(this.cl==5){return 22648}else if(this.cl==6){return 26128}else{return 20688}},uw:function(){if(this.cl==1){if(this.star==0){return 38484}else if(this.star==1){return 42332}else if(this.star==2){return 50029}else if(this.star==3){return 61574}else if(this.star==4){return 76968}else{return 96209}}else if(this.cl==2){if(this.star==0){return 43615}else if(this.star==1){return 47976}else if(this.star==2){return 56699}else if(this.star==3){return 69784}else if(this.star==4){return 87230}else{return 109037}}else if(this.cl==3){if(this.star==0){return 53976}else if(this.star==1){return 59373}else if(this.star==2){return 70169}else if(this.star==3){return 86362}else if(this.star==4){return 107952}else{return 134940}}else if(this.cl==4){if(this.star==0){return 47957}else if(this.star==1){return 52752}else if(this.star==2){return 62344}else if(this.star==3){return 76731}else if(this.star==4){return 95914}else{return 119892}}else if(this.cl==5){if(this.star==0){return 49239}else if(this.star==1){return 54163}else if(this.star==2){return 64011}else if(this.star==3){return 78783}else if(this.star==4){return 98479}else{return 123099}}else if(this.cl==6){if(this.star==0){return 50325}else if(this.star==1){return 55357}else if(this.star==2){return 65422}else if(this.star==3){return 80520}else if(this.star==4){return 100650}else{return 125812}}else{if(this.star==0){return 50325}else if(this.star==1){return 55357}else if(this.star==2){return 65422}else if(this.star==3){return 80520}else if(this.star==4){return 100650}else{return 125812}}},OA:function(){var result=Number(this.uw)+Number(this.base)
if(this.ear=='1'){result=Number(result)+Number(this.earring)
return result}else{return result}},a:function(){if(this.tier==8){return 0.24}else if(this.tier==7){return 0.22}else{return 0.20}},b:function(){if(this.tier==8){return 0.12}else if(this.tier==7){return 0.11}else{return 0.10}},perkatk:function(){var x=0
if(this.perk1){x=Number(x)+Number(30)}
if(this.cl==2&&this.perk2.includes("wa2")){x=Number(x)+Number(this.wa2)}
if(this.cl==4&&this.perk2.includes("as1")){x=Number(x)+Number(20)}
if(this.cl==3&&this.perk2.includes("ar1")){x=Number(x)+Number(20)}
if(this.cl==5&&this.perk2.includes("me1")){x=Number(x)+Number(20)}
if(this.cl==6&&this.perk2.includes("wi1")){x=Number(x)+Number(15)}
if(this.cl==6&&this.perk2.includes("wi2")){x=Number(x)+Number(40)}
return x},ATK:function(){var x=0
x=Number(this.addatk)+Number(this.art_1)+Number(this.skillatk)+Number(this.perkatk)
return x},BATK:function(){var x=0
x=Number(100)+Number(this.ATK)
return x},T:function(){var x=0
x=Number(100)+Number(this.scale)+Number(this.art_3)
return x},A:function(){return(this.T/100*this.OA*this.BATK/100)},BFa:function(){var x=0
x=Number(this.Fa)+Number(this.skillfa)
return x},R2:function(){var x=0
x=Number(this.uw_rune_2)+Number(selectrune(this.armor_rune_1,2))+Number(selectrune(this.armor_rune_2,2))+Number(selectrune(this.subarmor_rune_1,2))+Number(selectrune(this.subarmor_rune_2,2))
return x},perkcdmg:function(){x=0
if(this.cl==2&&this.perk2.includes("wa1")){x=Number(x)+Number(30)}
if(this.cl==4&&this.perk2.includes("as2")){x=Number(x)+Number(30)}
if(this.cl==3&&this.perk2.includes("ar2")){x=Number(x)+Number(30)}
return x},Cd:function(){var x=0
x=Number(this.addcdmg)+Number(this.armor_enc_2)+Number(this.subarmor_enc_2)+Number(this.acc_enc_2)+Number(this.orb_enc_2)+Number(this.ut1_2)+Number(this.ut2_2)+Number(this.ut3_2)+Number(this.art_2)+Number(this.skillcdmg)+Number(this.perkcdmg)
return x},BCd:function(){var x=0
if(this.cl==4){x=30}else if(this.cl==5){x=50}else{x=0}
var output=Number(200)+Number(this.Cd)+Number(this.R2)+Number(x)
return output},R1:function(){var x=0
x=Number(this.uw_rune_1)+Number(selectrune(this.armor_rune_1,1))+Number(selectrune(this.armor_rune_2,1))+Number(selectrune(this.subarmor_rune_1,1))+Number(selectrune(this.subarmor_rune_2,1))+Number(this.armor_enc_1)+Number(this.subarmor_enc_1)+Number(this.acc_enc_1)+Number(this.orb_enc_1)+Number(this.ut1_1)+Number(this.ut2_1)+Number(this.ut3_1)
return x},M:function(){var x=0
x=Number(this.armor_line)+Number(this.subarmor_line)+Number(this.acc_line)+Number(this.orb_line)
return x},m:function(){var x=0
x=Math.round(Number(1/(2*this.b))+Number(this.R1/(200*this.b))+Number(this.M/2)+Number(this.BFa*this.T/(200*this.b*this.A))-Number(this.BCd/(200*this.a)))
return x},n:function(){return Math.round(this.M-this.m)},pref:function(){var x=0
x=(Number(this.BCd*0.01)+Number(this.a*this.m))*this.T*0.01*(Number(this.BFa)+Number(this.OA*this.BATK*0.01*(Number(1)+Number(this.R1*0.01)+Number(this.b*this.n))))
return Math.round(x)},f:function(){var x=0
x=this.pref*this.heroscale
return Math.round(x)}},components:{post:post},methods:{calcf:function(m){return(Number(this.BCd*0.01)+Number(this.a*m))*this.T*0.01*(Number(this.BFa)+Number(this.OA*this.BATK*0.01*(Number(1)+Number(this.R1*0.01)+Number(this.b*(this.M-m)))))},alert:function(){addClass(document.getElementById('result'),'show')},closeAlert:function(){removeClass(document.getElementById('result'),'show')},reset:function(){window.location.href="index.html#"+this.hero
window.location.reload()
assignCollapse()},onClickChild:function(data){this.skillatk=Number(this.skillatk)+Number(data[0])
this.skillcdmg=Number(this.skillcdmg)+Number(data[1])
this.skillfa=Number(this.skillfa)+Number(data[2])},onSelect:function(data,id){if(this.uwtemp[id]!=null){uwforid=this.uwtemp[id]}else{this.uwtemp[id]=[0,0,0]
uwforid=this.uwtemp[id]}
this.skillatk=this.skillatk-uwforid[0]
this.skillcdmg=this.skillcdmg-uwforid[1]
this.skillfa=this.skillfa-uwforid[2]
this.skillatk=Number(this.skillatk)+Number(data[0])
this.skillcdmg=Number(this.skillcdmg)+Number(data[1])
this.skillfa=Number(this.skillfa)+Number(data[2])
this.uwtemp[id]=data},onClickT5:function(data){this.skillatk=Number(this.skillatk)+Number(data[0])
this.skillcdmg=Number(this.skillcdmg)+Number(data[1])
this.skillfa=Number(this.skillfa)+Number(data[2])},onSelectUT:function(data,id,utno){if(this.uttemp[id]!=null){if(this.uttemp[id][utno]!=null){utforid=this.uttemp[id][utno]}else{this.uttemp[id][utno]=[0,0,0]
utforid=this.uttemp[id][utno]}}else{this.uttemp[id]={"s1":[0,0,0],"s2":[0,0,0],"s3":[0,0,0],"s4":[0,0,0]}
utforid=this.uttemp[id][utno]}
this.skillatk=this.skillatk-utforid[0]
this.skillcdmg=this.skillcdmg-utforid[1]
this.skillfa=this.skillfa-utforid[2]
this.skillatk=Number(this.skillatk)+Number(data[0])
this.skillcdmg=Number(this.skillcdmg)+Number(data[1])
this.skillfa=Number(this.skillfa)+Number(data[2])
this.uttemp[id][utno]=data},calibrate:function(){if(this.pref==0){console.log('divide by zero error')
return}
this.heroscale=this.obs/this.pref}},beforeUpdate:function(){unassignCollapse()},updated:function(){this.$nextTick(function(){assignCollapse()
var list=document.getElementsByClassName('current')
for(var i=0;i<list.length;i++){removeClass(list[i],'current')}
addClass(document.getElementById(hash),'current')
arraym=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
arrayf=arraym.map(a=>this.calcf(a))
Plotly.react(TESTER,[{x:arraym,y:arrayf}],{margin:{t:0}})})},mounted:function(){this.$nextTick(function(){assignCollapse()
addClass(document.getElementById(hash),'current')})}})}