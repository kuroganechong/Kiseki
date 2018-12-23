if (window.location.hash) {
    // Fragment exists
    var hash = window.location.hash.substr(1)
} else {
    // Fragment doesn't exist
    var hash = 1
}

function toggleCollapse() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
        content.style.border = '0 solid darkgray'
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
        content.style.border = '1px solid darkgray'
    }
    var parent = document.getElementById('parentcontent')
    if (content != parent) {
        if (parent.style.maxHeight) {
            parent.style.maxHeight = String(Number(parent.scrollHeight) + Number(content.scrollHeight)) + "px";
        }
    }
    var parent = document.getElementById('parentcontent1')
    if (content != parent) {
        if (parent.style.maxHeight) {
            parent.style.maxHeight = String(Number(parent.scrollHeight) + Number(content.scrollHeight)) + "px";
        }
    }
}

function assignCollapse() {
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", toggleCollapse);
    }
}

function unassignCollapse() {
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
        coll[i].removeEventListener("click", toggleCollapse);
    }
}

function hasClass(el, className) {
    if (el.classList)
        return el.classList.contains(className);
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}

function addClass(el, className) {
    if (el.classList)
        el.classList.add(className)
    else if (!hasClass(el, className))
        el.className += " " + className;
}

function removeClass(el, className) {
    if (el.classList)
        el.classList.remove(className)
    else if (hasClass(el, className)) {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
        el.className = el.className.replace(reg, ' ');
    }
}

var jsonval = []
var app
//$.getJSON("data/hero.json").done(function (data) {
$.getJSON("https://raw.githubusercontent.com/kuroganechong/Kiseki/master/src/data/hero.json").done(function (data) {
    jsonval = data['0']

    app = new Vue({
        el: '#app',
        data: {
            statatk: 0,
            statcdmg: 0,
            statpen: 0,
            art_1: 0,
            art_2: 0,
            art_3: 0,
            scale: 0,
            addatk: 0,
            addcdmg: 0,
            Fa: 0,
            skillatk: 0,
            skillcdmg: 0,
            skillfa: 0,
            skilldmg: 0,
            hero: hash,
            uwtemp: {},
            uttemp: {},
            posts: jsonval,
            heronames: heronames,
            perk1: false,
            perk1_d: false,
            perk2: [],
            wa2: 0,
            wa3base: 0,
            wa3flat: 0,
            wa3perc: 0,
            obs: 0,
            heroscale: 1,
            skillbase: 0,
            skillmulti: 1,
            skillbook: 50,
            enemydef: 0,
            defdownperc: 0,
            defshred: 0,
            pen: 0,
            pendata: {
                MaxK: 900,
                X1: 1000,
                A1: 2,
                B1: 1000,
                X2: 450,
                A2: 409,
                B2: 266,
                MinK: 0,
                X3: -500,
                A3: 0,
                B3: 0,
                X4: 0,
                A4: 0,
                B4: 0
            },
            lilia_buff_mana: 0,
            lilia_gear_mana: 0,
            lilia_ut3_stacks: 0,
            lilia_ut3_stars: 0,
            nyx_stacks: 0,
            annette_t5d: 0,
            frey_t5d: 0,
            priscilla_t5d: 0,
            priscilla_s2_ut: 0,
            ricardo_t5d: 0,
            mediana_s3_base: 0,
            mediana_s3_l: 0
        },
        computed: {
            specialFlat: function(){
                var medi = 0
                if(this.mediana_s3_l){
                    medi = 0.4
                }
                var x = Number(this.annette_t5d*0.05)
                        + Number(this.frey_t5d*0.05)
                        + Number(this.priscilla_t5d*0.03)
                        + Number(this.ricardo_t5d*0.5)
                if(this.priscilla_t5d > 0){
                    x = Number(x) + (Number(this.priscilla_t5d*0.15) + Number(8215))*(Number(1.5) + Number(this.priscilla_s2_ut)/100)
                }
                if(this.mediana_s3_base > 0){
                    x = Number(x) + (Number(this.mediana_s3_base*0.2) + Number(37932))*(Number(1.5) + Number(medi))
                }
                return x
            },
            lilia_s4_atk: function(){
                const x = 120*(Number(1)+Number(this.lilia_gear_mana/100))*(Number(1)+Number(this.lilia_buff_mana/100))/6
                return x
            },
            lilia_ut3_cdmg: function(){
                const x = this.lilia_ut3_stars*this.lilia_ut3_stacks
                return x
            },
            nyx_t5_atk: function(){
                const x = 10*this.nyx_stacks
                return x
            },
            effpen: function () {
                return this.actualStat(this.pendata, this.pen)
            },
            cl: function () {
                return heroclass[this.hero]
            },
            perkatk: function () {
                var x = 0
                if (this.perk1) {
                    x = Number(x) + Number(30)
                }
                if (this.cl == 2 && this.perk2.includes("wa2")) {
                    if (this.wa2 > 10) {
                        this.wa2 = 10
                    }
                    x = Number(x) + Number(this.wa2) * 7
                }
                if (this.cl == 4 && this.perk2.includes("as1")) {
                    x = Number(x) + Number(20)
                }
                if (this.cl == 3 && this.perk2.includes("ar1")) {
                    x = Number(x) + Number(20)
                }
                if (this.cl == 5 && this.perk2.includes("me1")) {
                    x = Number(x) + Number(20)
                }
                if (this.cl == 6 && this.perk2.includes("wi1")) {
                    x = Number(x) + Number(15)
                }
                if (this.cl == 6 && this.perk2.includes("wi2")) {
                    x = Number(x) + Number(40)
                }
                return x
            },
            ATK: function () {
                var x = 0
                // sum of all ATK skills
                x = Number(this.addatk) + Number(this.art_1) + Number(this.skillatk) + Number(this.perkatk)
                return x
            },
            BATK: function () {
                var x = 0
                x = Number(100) + Number(this.ATK)
                // Special heroes ATK goes here
                if(this.hero == 57){
                    x = Number(x) + Number(this.lilia_s4_atk)
                }
                if(this.hero == 33){
                    x = Number(x) + Number(this.nyx_t5_atk)
                }
                return x
            },
            skillT: function(){
                var x = this.skilldmg
                if(this.perk1_d){
                    x = Number(x) + Number(10)
                }
                if (this.cl == 4 && this.perk2.includes("as3")) {
                    x = Number(x) + Number(10)
                }
                return x
            },
            T: function () {
                var x = 0
                x = Number(100) + Number(this.scale) + Number(this.art_3) + Number(this.skillT)
                return x
            },
            wa3fa: function () {
                if (this.perk2.includes('wa3')) {
                    var y = 0
                    y = Number(Number(this.wa3base) * (Number(this.wa3perc) + Number(100)) * 0.01) + Number(this.wa3flat)
                    return y * 0.5
                } else {
                    return 0
                }
            },
            BFa: function () {
                var x = 0
                // sum of all flat ATK buff
                x = Number(this.Fa) + Number(this.skillfa) + Number(this.wa3fa) + Number(this.specialFlat)
                return x
            },
            perkcdmg: function () {
                x = 0
                if (this.cl == 2 && this.perk2.includes("wa1")) {
                    x = Number(x) + Number(30)
                }
                if (this.cl == 4 && this.perk2.includes("as2")) {
                    x = Number(x) + Number(30)
                }
                if (this.cl == 3 && this.perk2.includes("ar2")) {
                    x = Number(x) + Number(30)
                }
                if (this.cl == 3 && this.perk2.includes("ar3")) {
                    x = Number(x) + Number(80)
                }
                if (this.perk2.includes("me2")) {
                    x = Number(x) + Number(30)
                }
                return x
            },
            Cd: function () {
                var x = 0
                // sum of all CDMG skills + enchant + ut
                x = Number(200) + Number(this.addcdmg) + Number(this.art_2) + Number(this.skillcdmg) + Number(this.perkcdmg) + Number(this.statcdmg)
                // Special heroes CDMG goes here
                if(this.hero == 57){
                    x = Number(x) + Number(this.lilia_ut3_cdmg)
                }
                return x
            },
            pref: function () {
                var x = 0
                x = (Number(this.Cd * 0.01)) * this.T * 0.01 * (Number(this.BFa) + Number(this.statatk * this.BATK * 0.01))
                return Math.round(x)
            },
            f: function () {
                var x = 0
                x = (Number(this.Cd * 0.01)) * this.T * 0.01 * (Number(this.BFa) + Number(this.statatk * this.BATK * 0.01)) * this.heroscale
                return Math.round(x)
            },
            skillfocus: function () {
                var T = (Number(this.skillbook * 0.01) + Number(this.T * 0.01))
                var der_a = this.statatk * this.Cd * (this.defreduce) * 0.01 * T * this.skillmulti
                var der_c = Number((Number(this.statatk * this.BATK * 0.01) + Number(this.BFa)) * (this.defreduce) * T * this.skillmulti) + Number(this.skillbase * this.defreduce * T)
                var der_p = this.percfpen * 100 * this.skillf
                var der_T = Number((Number(this.statatk * this.BATK * 0.01) + Number(this.BFa)) * (this.defreduce) * this.Cd * 0.01 * this.skillmulti) + Number(this.skillbase * this.Cd * this.defreduce * 0.01)

                var arr = [der_a, der_c, der_p, der_T];
                var maxIndex = [0];
                var max = arr[0]

                for (var i = 1; i < arr.length; i++) {
                    if (arr[i] - max > 0.001) {
                        maxIndex = [i];
                        max = arr[i];
                    } else if (Math.abs(arr[i] - max) < 0.001) {
                        maxIndex.push(i);
                    }
                }

                return maxIndex
            },
            skillf: function () {
                var x = 0
                x = (Number((Number(this.statatk * this.BATK * 0.01) + Number(this.BFa)) * this.skillmulti) + Number(this.skillbase)) * this.Cd * 0.01 * (Number(this.skillbook * 0.01) + Number(this.T * 0.01))
                return Math.round(x)
            },
            defreduce: function () {
                var DEF = 0
                DEF = (this.enemydef * (1 - this.defdownperc * 0.01) - this.defshred) * (1 - this.effpen / 100)
                return (1 - 0.9817 * DEF / (Number(19360.3675) + Number(DEF)))
            },
            percfpen: function () {
                var a = 0.9817
                var b = 19360.3675
                var A = this.f
                if (A == 0) {
                    A = 1
                }
                var B = (this.enemydef * (1 - this.defdownperc * 0.01) - this.defshred)
                var x = this.effpen / 100
                var y = (B * x - B - b) * (B * x - B - b)
                if (y == 0) {
                    y = 1
                }
                return (a * b * B * A * this.rate(this.pendata, this.pen) / 100 / y) / A * 100
            },
            aafocus: function () {
                var der_a = this.statatk * this.Cd * (this.defreduce) * 0.01 * this.T * 0.01 
                var der_c = (Number(this.statatk * this.BATK * 0.01) + Number(this.BFa)) * (this.defreduce) * this.T * 0.01 
                var der_p = this.percfpen * 100 * this.pref
                var der_T = (Number(this.statatk * this.BATK * 0.01) + Number(this.BFa)) * (this.defreduce) * this.Cd * 0.01 

                var arr = [der_a, der_c, der_p, der_T];
                var maxIndex = [0];
                var max = arr[0]

                for (var i = 1; i < arr.length; i++) {
                    if (arr[i] - max > 0.001) {
                        maxIndex = [i];
                        max = arr[i];
                    } else if (Math.abs(arr[i] - max) < 0.001) {
                        maxIndex.push(i);
                    }
                }

                return maxIndex
            }
        },
        components: {
            post: post,
            post2: post2
        },
        methods: {
            // imported from MoG
            actualStat: function (statType, istat) {
                var actual = 0;
                // variable names are fucked cause vespa
                if (istat === 0) {
                    actual = 0;
                    // 2nd upper softcap
                } else if (istat > statType.X1) {
                    actual = this.attenuateInv(
                        istat,
                        statType.MaxK,
                        statType.A1,
                        statType.B1
                    );
                    // 1st upper softcap
                } else if (istat > statType.X2) {
                    actual = Number(Math.floor((istat * statType.A2) / 1000)) + Number(statType.B2);
                    // 2nd lower softcap
                } else if (istat < statType.X3) {
                    actual = this.attenuateInv(
                        istat,
                        statType.MinK,
                        statType.A3,
                        statType.B3
                    );
                    // 1st lower softcap
                } else if (istat < statType.X4) {
                    actual = this.attenuate(istat, statType.MinK, statType.A4, statType.B4);
                    // uncapped
                } else {
                    actual = istat;
                }
                // return to 1 significant decimal place
                actual = Math.round(actual) / 10;
                return actual.toFixed(1);
            },
            attenuate: function (x, k, a, b) {
                return Math.floor((k * 1000000) / (Number(a * x * x) + Number(b * x) + Number(1000000)));
            },
            attenuateInv: function (x, k, a, b) {
                return k - Math.floor((k * 1000000) / (Number(a * x * x) + Number(b * x) + Number(1000000)));
            },
            // end import
            rattenuateInv: function (x, k, a, b) {
                return 0 - Math.floor((k * 1000000) * (Number(2 * a * x) + Number(b)) / 10 / (Number(a * x * x) + Number(b * x) + Number(1000000)) / (Number(a * x * x) + Number(b * x) + Number(1000000)));
            },
            rate: function (statType, istat) {
                var ractual = 0;
                // variable names are fucked cause vespa
                if (istat > statType.X1) {
                    ractual = this.rattenuateInv(
                        istat,
                        statType.MaxK,
                        statType.A1,
                        statType.B1
                    );
                    // 1st upper softcap
                } else if (istat > statType.X2) {
                    ractual = Math.floor(statType.A2) / 10000;
                    // uncapped
                } else {
                    ractual = 1 / 10;
                }
                // return to 1 significant decimal place
                return ractual;
            },
            reset: function () {
                window.location.href = "calc.html#" + this.hero
                window.location.reload()
                assignCollapse()
            },
            onClickChild: function (data) {
                // data is array of 3 elements [ATK,CDMG,fa]
                this.skillatk = Number(this.skillatk) + Number(data[0])
                this.skillcdmg = Number(this.skillcdmg) + Number(data[1])
                this.skillfa = Number(this.skillfa) + Number(data[2])
            },
            onSelect: function (data, id) {
                // data is array of 3 elements [ATK,CDMG,fa]
                if (this.uwtemp[id] != null) {
                    uwforid = this.uwtemp[id]
                } else {
                    this.uwtemp[id] = [0, 0, 0, 0]
                    uwforid = this.uwtemp[id]
                }
                this.skillatk = this.skillatk - uwforid[0]
                this.skillcdmg = this.skillcdmg - uwforid[1]
                this.skillfa = this.skillfa - uwforid[2]
                this.skillatk = Number(this.skillatk) + Number(data[0])
                this.skillcdmg = Number(this.skillcdmg) + Number(data[1])
                this.skillfa = Number(this.skillfa) + Number(data[2])
                this.uwtemp[id] = data
            },
            onClickT5: function (data) {
                // data is array of 3 elements [ATK,CDMG,fa]
                this.skillatk = Number(this.skillatk) + Number(data[0])
                this.skillcdmg = Number(this.skillcdmg) + Number(data[1])
                this.skillfa = Number(this.skillfa) + Number(data[2])
            },
            onSelectUT: function (data, id, utno) {
                // data is array of 3 elements [ATK,CDMG,fa]
                if (this.uttemp[id] != null) {
                    if (this.uttemp[id][utno] != null) {
                        utforid = this.uttemp[id][utno]
                    } else {
                        this.uttemp[id][utno] = [0, 0, 0, 0]
                        utforid = this.uttemp[id][utno]
                    }
                } else {
                    this.uttemp[id] = {
                        "s1": [0, 0, 0, 0],
                        "s2": [0, 0, 0, 0],
                        "s3": [0, 0, 0, 0],
                        "s4": [0, 0, 0, 0]
                    }
                    utforid = this.uttemp[id][utno]
                }
                this.skillatk = this.skillatk - utforid[0]
                this.skillcdmg = this.skillcdmg - utforid[1]
                this.skillfa = this.skillfa - utforid[2]
                this.skillatk = Number(this.skillatk) + Number(data[0])
                this.skillcdmg = Number(this.skillcdmg) + Number(data[1])
                this.skillfa = Number(this.skillfa) + Number(data[2])
                this.uttemp[id][utno] = data
            },
            onClickChildDMG: function (data) {
                // data is DMG
                this.skilldmg = Number(this.skilldmg) + Number(data)
            },
            onSelectDMG: function (data, id) {
                // data is DMG
                if (this.uwtemp[id] != null) {
                    uwforid = this.uwtemp[id]
                } else {
                    this.uwtemp[id] = [0, 0, 0, 0]
                    uwforid = this.uwtemp[id]
                }
                this.skilldmg = this.skilldmg - uwforid[3]
                this.skilldmg = Number(this.skilldmg) + Number(data)
                this.uwtemp[id][3] = data
            },
            onClickT5DMG: function (data) {
                // data is DMG
                this.skilldmg = Number(this.skilldmg) + Number(data)
            },
            onSelectUTDMG: function (data, id, utno) {
                // data is DMG
                if (this.uttemp[id] != null) {
                    if (this.uttemp[id][utno] != null) {
                        utforid = this.uttemp[id][utno]
                    } else {
                        this.uttemp[id][utno] = [0, 0, 0, 0]
                        utforid = this.uttemp[id][utno]
                    }
                } else {
                    this.uttemp[id] = {
                        "s1": [0, 0, 0, 0],
                        "s2": [0, 0, 0, 0],
                        "s3": [0, 0, 0, 0],
                        "s4": [0, 0, 0, 0]
                    }
                    utforid = this.uttemp[id][utno]
                }
                this.skilldmg = this.skilldmg - utforid[3]
                this.skilldmg = Number(this.skilldmg) + Number(data)
                this.uttemp[id][utno][3] = data
            },
            calibrate: function () {
                if (this.pref == 0) {
                    console.log('divide by zero error')
                    return
                }
                this.heroscale = this.obs / this.pref
            }
        },
        beforeUpdate: function () {
            unassignCollapse()
        },
        updated: function () {
            this.$nextTick(function () {
                assignCollapse()
                var list = document.getElementsByClassName('current')
                for (var i = 0; i < list.length; i++) {
                    removeClass(list[i], 'current')
                }
                addClass(document.getElementById(hash), 'current')
            })
        },
        mounted: function () {
            this.$nextTick(function () {
                assignCollapse()
                addClass(document.getElementById(hash), 'current')
                removeClass(document.getElementById('app'), 'hide')
            })
        }
    })
});

/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}