if (window.location.hash) {
    // Fragment exists
    var hash = window.location.hash.substr(1)
} else {
    // Fragment doesn't exist
    var hash = 1
}

function getSum(total, num) {
    return Number(total) + Number(num);
}

function selectrune(data, mode) {
    switch (data) {
        case '1':
            // 11 ATK
            if (mode == 1) {
                x = 11
            }
            break;
        case '2':
            // 22 CDMG
            if (mode == 2) {
                x = 22
            }
            break;
        case '3':
            // 40 CDMG
            if (mode == 2) {
                x = 40
            }
            break;
        case '4':
            // 30 CDMG
            if (mode == 2) {
                x = 30
            }
            break;
        default:
            // others
            x = 0
            break;
    }
    return x
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

var heronames = { "Kasel": "1", "Frey": "2", "Cleo": "3", "Roi": "4", "Gau": "5", "Phillop": "6", "Lakrak": "7", "Kaulah": "8", "Epis": "9", "Selene": "10", "Maria": "11", "Miruru": "12", "Lorraine": "13", "Clause": "15", "Rephy": "16", "Dimael": "17", "Reina": "18", "Pavel": "19", "Demia": "20", "Naila": "21", "Rodina": "22", "Morrah": "23", "Baudouin": "24", "Jane": "25", "Aisha": "26", "Leo": "27", "Fluss": "28", "Luna": "29", "Laias": "30", "Arch": "31", "Lewisia": "32", "Nyx": "33", "Annette": "34", "Mitra": "35", "Ricardo": "36", "Tanya": "37", "Ezekiel": "38", "Cassandra": "39", "Theo": "40", "Mediana": "41", "Oddy": "42", "Viska": "43", "Priscilla": "44", "Yanne": "45", "Zafir": "46", "Ophelia": "49", "Requina": "50", "Aselica": "51", "Crow": "52", "Shamilla": "53", "Seria": "55", "Erze": "56", "Lilia": "57", "Laudia": "58", "Lucias": "59", "Chrisha": "60", "Neraxis": "61", "Scarlet": "62", "Sonia": "63", "Artemia": "64", "Mirianne": "65", "Shea": "66", "Kara": "67", "Nia": "68", "Chase": "73", "May": "90", "Gladi": "91", "Veronica": "92", "Loman": "93", "Juno": "94", "Nicky": "95" }
var heroclass = { "1": "2", "2": "7", "3": "6", "4": "4", "5": "2", "6": "1", "7": "5", "8": "7", "9": "4", "10": "3", "11": "6", "12": "5", "13": "6", "15": "1", "16": "7", "17": "3", "18": "4", "19": "6", "20": "1", "21": "2", "22": "5", "23": "1", "24": "7", "25": "1", "26": "6", "27": "7", "28": "4", "29": "3", "30": "7", "31": "3", "32": "6", "33": "6", "34": "5", "35": "5", "36": "1", "37": "4", "38": "4", "39": "7", "40": "2", "41": "7", "42": "5", "43": "2", "44": "2", "45": "3", "46": "3", "49": "6", "50": "3", "51": "1", "52": "5", "53": "3", "55": "2", "56": "4", "57": "6", "58": "4", "59": "7", "60": "5", "61": "1", "62": "2", "63": "1", "64": "6", "65": "4", "66": "7", "67": "5", "68": "4", "73": "2", "90": "7", "91": "4", "92": "6", "93": "1", "94": "7", "95": "2" }

//$.getJSON("data/hero.json").done(function (data) {
$.getJSON("https://raw.githubusercontent.com/kuroganechong/Kiseki/master/src/data/hero.json").done(function (data) {
    jsonval = data['0']
    setVue()
});

function setVue() {
    var post = Vue.component('hero', {
        props: ['post', 'hero'],
        data: function () {
            return { c: 0 }
        },
        template: '<div v-if="(post.ally == 1 && post.id != hero) || (post.ally != 1 && post.id == hero)">\
                    <button class="collapsible" v-bind:id="post.id">{{ matchName(post.id) }}</button>\
                    <div class="content">\
                    <div v-if="checkAvail(post.uw, 0)">\
                    UW: <select v-on:change="selUW(String(0) + String(post.ally) + String(post.id))" v-bind:id="String(0) + String(post.ally) + String(post.id)">\
                    <option value="">Please select</option>\
                    <option v-for="(uw, star) in post.uw" v-bind:value="uw">{{star}} star: <span v-if="uw[0] != 0">ATK {{ uw[0] }}%</span><span v-if="uw[1] != 0"> CDMG {{ uw[1] }}%</span><span v-if="uw[2] != 0"> Flat ATK {{ uw[2] }}</span></option>\
                    </select>\
                    </div>\
                    \
                    <div v-if="checkAvail(post.t5[1], 0) || checkAvail(post.t5[2], 0)">\
                    T5:\
                    <input type="checkbox" v-bind:id="String(51) + post.ally + post.id" v-bind:value="post.t5[1]" v-on:click="clickT5(String(51) + post.ally + post.id)">\
                    <label class="clickLabel" v-bind:for="String(51) + post.ally + post.id">\
                    Light: \
                    <span v-if="post.t5[1][0] != 0">ATK {{ post.t5[1][0] }}%</span>\
                    <span v-if="post.t5[1][1] != 0"> CDMG {{ post.t5[1][1] }}%</span>\
                    <span v-if="post.t5[1][2] != 0"> Flat ATK {{ post.t5[1][2] }}</span>\
                    <span v-if="!checkAvail(post.t5[1], 0)"> None</span>\
                    </label>\
                    <input type="checkbox" v-bind:id="String(52) + post.ally + post.id" v-bind:value="post.t5[2]" v-on:click="clickT5(String(52) + post.ally + post.id)">\
                    <label class="clickLabel" v-bind:for="String(52) + post.ally + post.id">\
                    Dark: \
                    <span v-if="post.t5[2][0] != 0">ATK {{ post.t5[2][0] }}%</span>\
                    <span v-if="post.t5[2][1] != 0"> CDMG {{ post.t5[2][1] }}%</span>\
                    <span v-if="post.t5[2][2] != 0"> Flat ATK {{ post.t5[2][2] }}</span>\
                    <span v-if="!checkAvail(post.t5[2], 0)"> None</span>\
                    </label>\
                    </div>\
                    \
                    <div v-for="(skill, skillno, index) in post.data" v-bind:key="skillno + post.ally + post.id">\
                    <div v-if="checkAvail(skill[1], 0) || checkAvail(skill[2], 0) || checkAvail(skill[3], 0) || checkAvail(skill[4], 0)">\
                    <label>Skill: {{ skillno.charAt(1) }}</label>\
                    </div>\
                    <div v-if="checkAvail(skill[1], 0) || checkAvail(skill[2], 0) || checkAvail(skill[3], 0)">\
                    <span><input type="checkbox" v-on:click="onClick(1 + skillno + post.ally + post.id, skill[1], post.id)" v-bind:value="skill[1]" v-bind:id="1 + skillno + post.ally + post.id" v-bind:ref="1 + skillno + post.ally + post.id">\
                        <label class="clickLabel" v-bind:for="1 + skillno + post.ally + post.id" v-bind:id="11 + skillno + post.ally + post.id">\
                            Base skill: \
                            <span v-if="skill[1][0] != 0">ATK {{ skill[1][0] }}%</span>\
                            <span v-if="skill[1][1] != 0"> CDMG {{ skill[1][1] }}%</span>\
                            <span v-if="skill[1][2] != 0"> Flat ATK {{ skill[1][2] }}</span>\
                            <span v-if="!checkAvail(skill[1], 0)"> None</span>\
                        </label>\
                    </span><br>\
                    <span>\
                    <input type="checkbox" v-on:click="onClick(2 + skillno + post.ally + post.id, skill[2], post.id)" v-bind:value="skill[2]" v-bind:id="2 + skillno + post.ally + post.id" v-bind:ref="2 + skillno + post.ally + post.id">\
                        <label class="clickLabel disable" v-bind:for="2 + skillno + post.ally + post.id" v-bind:id="22 + skillno + post.ally + post.id">\
                            Light perk: \
                            <span v-if="skill[2][0] != 0">ATK {{ skill[2][0] }}%</span>\
                            <span v-if="skill[2][1] != 0"> CDMG {{ skill[2][1] }}%</span>\
                            <span v-if="skill[2][2] != 0"> Flat ATK {{ skill[2][2] }}</span>\
                            <span v-if="!checkAvail(skill[2], 0)"> None</span>\
                        </label>\
                    </span><br>\
                    <span>\
                    <input type="checkbox" v-on:click="onClick(3 + skillno + post.ally + post.id, skill[3], post.id)" v-bind:value="skill[3]" v-bind:id="3 + skillno + post.ally + post.id" v-bind:ref="3 + skillno + post.ally + post.id">\
                        <label class="clickLabel disable" v-bind:for="3 + skillno + post.ally + post.id" v-bind:id="33 + skillno + post.ally + post.id">\
                            Dark perk: \
                            <span v-if="skill[3][0] != 0">ATK {{ skill[3][0] }}%</span>\
                            <span v-if="skill[3][1] != 0"> CDMG {{ skill[3][1] }}%</span>\
                            <span v-if="skill[3][2] != 0"> Flat ATK {{ skill[3][2] }}</span>\
                            <span v-if="!checkAvail(skill[3], 0)"> None</span>\
                        </label>\
                    </span><br>\
                    </div>\
                    <div v-if="checkAvail(skill[4], 0)">\
                    UT: <select v-on:change="selUT(9 + skillno + post.ally + post.id, skillno)" v-bind:id="9 + skillno + post.ally + post.id">\
                    <option value="">No UT</option>\
                    <option v-for="(ut, star) in skill[4]" v-bind:value="ut">{{star}} star: <span v-if="ut[0] != 0">ATK {{ ut[0] }}%</span><span v-if="ut[1] != 0"> CDMG {{ ut[1] }}%</span><span v-if="ut[2] != 0"> Flat ATK {{ ut[2] }}</span></option>\
                    </select>\
                    </div>\
                    <span class="small" v-if="post.id == 61 && skillno.charAt(1) == 4">\
                    Note: S4 Dark only gives Flat ATK if S2 is active\
                    </span>\
                    <span class="small" v-if="post.id == 92 && skillno.charAt(1) == 4">\
                    Note: UW and S4 gives Flat ATK only when S2 is active\
                    </span>\
                    </div>\
                    </div>\
                    </div>', // 61 is neraxis, 92 is veronica
        methods: {
            selUW: function (id) {
                var data
                data = document.getElementById(id).value
                data = data.split(",")
                if (data[0] != "") {
                    this.$emit('selected', data, id)
                } else {
                    this.$emit('selected', [0, 0, 0], id)
                }
            },
            clickT5: function (id) {
                var data
                if (document.getElementById(id).checked) {
                    data = document.getElementById(id).value
                    data = data.split(",")
                    if (data[0] != "") {
                        this.$emit('clickedt5', data)
                    } else {
                        this.$emit('clickedt5', [0, 0, 0])
                    }
                } else {
                    data = document.getElementById(id).value
                    data = data.split(",")
                    newdata = [-data[0], -data[1], -data[2]]
                    if (newdata[0] != "") {
                        this.$emit('clickedt5', newdata)
                    } else {
                        this.$emit('clickedt5', [0, 0, 0])
                    }
                }
            },
            selUT: function (id, utno) {
                var data
                data = document.getElementById(id).value
                data = data.split(",")
                if (data[0] != "") {
                    this.$emit('selectedut', data, id, utno)
                } else {
                    this.$emit('selectedut', [0, 0, 0], id, utno)
                }
            },
            onClick: function (id, data, parent) {
                if (document.getElementById(id).checked) {
                    // for 2,3
                    if (id.charAt(0) == 2 || id.charAt(0) == 3) {
                        // check if 1 is checked, if yes then pass value up
                        parentid = 1 + id.substr(1)
                        if (document.getElementById(parentid).checked) {
                            this.$emit('clicked', data)
                            return this.c++
                        } else {
                            // Prevent checked children before parent
                            document.getElementById(id).checked = false
                        }
                    }
                    // for 1
                    if (id.charAt(0) == 1) {
                        // if checked pass value up
                        this.$emit('clicked', data)
                        // set others to unchecked
                        commonid = id.substr(1)
                        document.getElementById(2 + commonid).checked = false
                        document.getElementById(3 + commonid).checked = false
                        removeClass(document.getElementById(22 + commonid), 'disable')
                        removeClass(document.getElementById(33 + commonid), 'disable')
                        addClass(document.getElementById(parent), 'selected')
                        return this.c++
                    }
                } else {
                    // for 2,3,4
                    if (id.charAt(0) == 2 || id.charAt(0) == 3) {
                        // check if 1 is checked, if yes then pass value up
                        parentid = 1 + id.substr(1)
                        if (document.getElementById(parentid).checked) {
                            newdata = [-data[0], -data[1], -data[2]]
                            this.$emit('clicked', newdata)
                            return this.c--
                        } else {
                            // Prevent unchecked children before parent
                            document.getElementById(id).checked = true
                        }
                    }
                    // for 1
                    if (id.charAt(0) == 1) {
                        // if unchecked pass value up
                        newdata = [-data[0], -data[1], -data[2]]
                        this.$emit('clicked', newdata)
                        // emit event to children if they are in checked state, uncheck all children
                        commonid = id.substr(1)
                        if (document.getElementById(2 + commonid).checked) {
                            document.getElementById(id).checked = true
                            document.getElementById(2 + commonid).click()
                            document.getElementById(id).checked = false
                        }
                        if (document.getElementById(3 + commonid).checked) {
                            document.getElementById(id).checked = true
                            document.getElementById(3 + commonid).click()
                            document.getElementById(id).checked = false
                        }
                        addClass(document.getElementById(22 + commonid), 'disable')
                        addClass(document.getElementById(33 + commonid), 'disable')
                        removeClass(document.getElementById(parent), 'selected')
                        return this.c--
                    }
                }
            },
            checkAvail: function (object, verbose) {
                var x = false // isempty
                if (verbose) {
                    console.log(object)
                }

                // for s1,s2,s3,t51,t52
                if (!isNaN(object[0])) {
                    var sum = Number(object[0]) + Number(object[1]) + Number(object[2])
                    if (sum != 0) {
                        x = true
                    }
                } else { // for uw,ut
                    for (let index = 0; index < object.length; index++) {
                        const element = object[index];
                        var sum = Number(element[0]) + Number(element[1]) + Number(element[2])
                        if (sum != 0) {
                            x = true
                        }
                    }
                }
                return x
            },
            matchName: function (id) {
                var x = 'undefined'
                for (key in heronames) {
                    if (heronames.hasOwnProperty(key)) {
                        element = heronames[key];
                        if (id == element) {
                            x = key
                            break
                        }
                    }
                }
                return x
            }
        }
    })

    app = new Vue({
        el: '#app',
        data: {
            tier: '8',
            star: '0',
            uw_rune_1: 0,
            uw_rune_2: 0,
            armor_line: '4',
            armor_enc_1: 0,
            armor_enc_2: 0,
            armor_rune_1: '-',
            armor_rune_2: '-',
            subarmor_line: '4',
            subarmor_enc_1: 0,
            subarmor_enc_2: 0,
            subarmor_rune_1: '-',
            subarmor_rune_2: '-',
            ear: '1',
            acc_line: '4',
            acc_enc_1: 0,
            acc_enc_2: 0,
            orb_line: '4',
            orb_enc_1: 0,
            orb_enc_2: 0,
            ut1_1: 0,
            ut1_2: 0,
            ut2_1: 0,
            ut2_2: 0,
            ut3_1: 0,
            ut3_2: 0,
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
            hero: hash,
            uwtemp: {},
            uttemp: {},
            posts: jsonval,
            heronames: heronames,
            perk1: false,
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
            currentatk: 0,
            currentcdmg: 0,
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
            clause_def: 0,
            clause_uw_stars: 0,
            annette_t5d: 0,
            frey_t5d: 0,
            priscilla_t5d: 0,
            priscilla_s2_ut: 0,
            ricardo_t5d: 0,
            mediana_s3_base: 0,
            mediana_s3_l: 0
        },
        computed: {
            clause_uw_fa: function(){
                const x = this.clause_def*this.clause_uw_stars/100
                return x
            },
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
                if(this.hero == 15){//clause
                    x = Number(x) + Number(this.clause_uw_fa)
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
            textColor: function(){
                const x = (this.currentf - this.pref)/this.pref*100
                return {
                    'red': x < 0,
                    'green': x > 0
                }
            },
            skillTextColor: function(){
                const x = (this.currentskillf - this.skillf)/this.skillf*100
                return {
                    'red': x < 0,
                    'green': x > 0
                }
            },
            effpen: function(){
                return this.actualStat(this.pendata, this.pen)
            },
            defreduce: function () {
                var DEF = 0
                DEF = (this.enemydef * (1 - this.defdownperc * 0.01) - this.defshred) * (1 - this.effpen / 100)
                return (1 - 0.9817 * DEF / (Number(19360.3675) + Number(DEF)))
            },
            cl: function () {
                return heroclass[this.hero]
            },
            earring: function () {
                if (this.tier == 8) {
                    return 23702
                } else if (this.tier == 7) {
                    return 18926
                } else {
                    return 13291
                }
            },
            base: function () {
                if (this.cl == 1) {
                    return 17632
                } else if (this.cl == 2) {
                    return 20032
                } else if (this.cl == 3) {
                    return 24824
                } else if (this.cl == 4) {
                    return 21992
                } else if (this.cl == 5) {
                    return 22648
                } else if (this.cl == 6) {
                    return 26128
                } else {
                    return 20688
                }
            },
            uw: function () {
                if (this.cl == 1) {
                    if (this.star == 0) {
                        return 38484
                    } else if (this.star == 1) {
                        return 42332
                    } else if (this.star == 2) {
                        return 50029
                    } else if (this.star == 3) {
                        return 61574
                    } else if (this.star == 4) {
                        return 76968
                    } else {
                        return 96209
                    }
                } else if (this.cl == 2) {
                    if (this.star == 0) {
                        return 43615
                    } else if (this.star == 1) {
                        return 47976
                    } else if (this.star == 2) {
                        return 56699
                    } else if (this.star == 3) {
                        return 69784
                    } else if (this.star == 4) {
                        return 87230
                    } else {
                        return 109037
                    }
                } else if (this.cl == 3) {
                    if (this.star == 0) {
                        return 53976
                    } else if (this.star == 1) {
                        return 59373
                    } else if (this.star == 2) {
                        return 70169
                    } else if (this.star == 3) {
                        return 86362
                    } else if (this.star == 4) {
                        return 107952
                    } else {
                        return 134940
                    }
                } else if (this.cl == 4) {
                    if (this.star == 0) {
                        return 47957
                    } else if (this.star == 1) {
                        return 52752
                    } else if (this.star == 2) {
                        return 62344
                    } else if (this.star == 3) {
                        return 76731
                    } else if (this.star == 4) {
                        return 95914
                    } else {
                        return 119892
                    }
                } else if (this.cl == 5) {
                    if (this.star == 0) {
                        return 49239
                    } else if (this.star == 1) {
                        return 54163
                    } else if (this.star == 2) {
                        return 64011
                    } else if (this.star == 3) {
                        return 78783
                    } else if (this.star == 4) {
                        return 98479
                    } else {
                        return 123099
                    }
                } else if (this.cl == 6) {
                    if (this.star == 0) {
                        return 50325
                    } else if (this.star == 1) {
                        return 55357
                    } else if (this.star == 2) {
                        return 65422
                    } else if (this.star == 3) {
                        return 80520
                    } else if (this.star == 4) {
                        return 100650
                    } else {
                        return 125812
                    }
                } else {
                    if (this.star == 0) {
                        return 50325
                    } else if (this.star == 1) {
                        return 55357
                    } else if (this.star == 2) {
                        return 65422
                    } else if (this.star == 3) {
                        return 80520
                    } else if (this.star == 4) {
                        return 100650
                    } else {
                        return 125812
                    }
                }
            },
            OA: function () {
                // Flat base ATK before any mulitplier
                var result = Number(this.uw) + Number(this.base)
                if (this.ear == '1') {
                    result = Number(result) + Number(this.earring)
                    return result
                } else {
                    return result
                }
            },
            a: function () {
                if (this.tier == 8) {
                    return 0.24
                } else if (this.tier == 7) {
                    return 0.22
                } else {
                    return 0.20
                }
            },
            b: function () {
                if (this.tier == 8) {
                    return 0.12
                } else if (this.tier == 7) {
                    return 0.11
                } else {
                    return 0.10
                }
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
            T: function () {
                var x = 0
                x = Number(100) + Number(this.scale) + Number(this.art_3)
                return x
            },
            A: function () {
                // Simplify the function
                return (this.T / 100 * this.OA * this.BATK / 100)
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
            R2: function () {
                var x = 0
                // sum of all CDMG runes
                x = Number(this.uw_rune_2)
                    + Number(selectrune(this.armor_rune_1, 2))
                    + Number(selectrune(this.armor_rune_2, 2))
                    + Number(selectrune(this.subarmor_rune_1, 2))
                    + Number(selectrune(this.subarmor_rune_2, 2))
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
                return x
            },
            Cd: function () {
                var x = 0
                // sum of all CDMG skills + enchant + ut
                x = Number(this.addcdmg) + Number(this.armor_enc_2) + Number(this.subarmor_enc_2) + Number(this.acc_enc_2) + Number(this.orb_enc_2)
                    + Number(this.ut1_2) + Number(this.ut2_2) + Number(this.ut3_2) + Number(this.art_2) + Number(this.skillcdmg) + Number(this.perkcdmg)
                return x
            },
            BCd: function () {
                var x = 0
                if (this.cl == 4) {
                    x = 30
                } else if (this.cl == 5) {
                    x = 50
                } else {
                    x = 0
                }
                var output = Number(200) + Number(this.Cd) + Number(this.R2) + Number(x)
                // Special heroes CDMG goes here
                if(this.hero == 57){
                    output = Number(output) + Number(this.lilia_ut3_cdmg)
                }
                return output
            },
            R1: function () {
                var x = 0
                // sum of all ATK runes and enchants and ut lines
                x = Number(this.uw_rune_1)
                    + Number(selectrune(this.armor_rune_1, 1))
                    + Number(selectrune(this.armor_rune_2, 1))
                    + Number(selectrune(this.subarmor_rune_1, 1))
                    + Number(selectrune(this.subarmor_rune_2, 1)) + Number(this.armor_enc_1) + Number(this.subarmor_enc_1) + Number(this.acc_enc_1) + Number(this.orb_enc_1)
                    + Number(this.ut1_1) + Number(this.ut2_1) + Number(this.ut3_1)
                return x
            },
            M: function () {
                var x = 0
                x = Number(this.armor_line) + Number(this.subarmor_line) + Number(this.acc_line) + Number(this.orb_line)
                return x
            },
            m: function () {
                var x = 0
                x = Math.round(Number(1 / (2 * this.b))
                    + Number(this.R1 / (200 * this.b))
                    + Number(this.M / 2)
                    + Number(this.BFa * this.T / (200 * this.b * this.A))
                    - Number(this.BCd / (200 * this.a)))
                if (x < 0) {
                    return 0
                } else if (x > this.M) {
                    return this.M
                }
                return x
            },
            n: function () {
                return Math.round(this.M - this.m)
            },
            B: function () {
                return this.OA * this.BATK * this.b * 0.01
            },
            skillm: function () {
                var x = 0
                x = Math.round(Number(1 / (2 * this.b))
                    - Number(this.BCd / (200 * this.a))
                    + Number(this.BFa / (2 * this.B))
                    + Number(this.R1 / (200 * this.b))
                    + Number(this.skillbase / (2 * this.B * this.skillmulti))
                    + Number(this.M / 2))
                if (x < 0) {
                    return 0
                } else if (x > this.M) {
                    return this.M
                }
                return x
            },
            skilln: function () {
                return Math.round(this.M - this.skillm)
            },
            pref: function () {
                var x = 0
                x = (Number(this.BCd * 0.01) + Number(this.a * this.m)) * this.T * 0.01 * (Number(this.BFa) + Number(this.OA * this.BATK * 0.01 * (Number(1) + Number(this.R1 * 0.01) + Number(this.b * this.n))))
                return Math.round(x)
            },
            f: function () {
                var x = 0
                x = this.pref * this.heroscale
                return Math.round(x)
            },
            skillf: function () {
                var x = 0
                var attack = Number(this.OA * this.BATK * 0.01 * ( Number(1) + Number(this.R1 * 0.01) + Number(this.b * this.M) - this.b * this.skillm )) + Number(this.BFa)
                var crit = Number(this.BCd * 0.01) + Number(this.a * this.skillm)
                x = ( Number(this.skillbase) + Number(attack * this.skillmulti) ) * crit * ( Number(this.skillbook) + Number(this.T) ) * 0.01
                return Math.round(x)
            },
            currentf: function () {
                var x = 0
                x = (Number(this.BCd * 0.01) + Number(this.a * this.currentcdmg)) * this.T * 0.01 * (Number(this.BFa) + Number(this.OA * this.BATK * 0.01 * (Number(1) + Number(this.R1 * 0.01) + Number(this.b * this.currentatk))))
                return Math.round(x)
            },
            currentskillf: function () {
                var x = 0
                var attack = Number(this.OA * this.BATK * 0.01 * ( Number(1) + Number(this.R1 * 0.01) + Number(this.b * this.currentatk) )) + Number(this.BFa)
                var crit = Number(this.BCd * 0.01) + Number(this.a * this.currentcdmg)
                x = ( Number(this.skillbase) + Number(attack * this.skillmulti) ) * crit * ( Number(this.skillbook) + Number(this.T) ) * 0.01
                return Math.round(x)
            }
        },
        components: {
            post: post
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
            calcf: function (m) {
                return (Number(this.BCd * 0.01) + Number(this.a * m)) * this.T * 0.01 * (Number(this.BFa) + Number(this.OA * this.BATK * 0.01 * (Number(1) + Number(this.R1 * 0.01) + Number(this.b * (this.M - m)))))
            },
            calcskillf: function (skillm) {
                var x = 0
                var attack = Number(this.OA * this.BATK * 0.01 * ( Number(1) + Number(this.R1 * 0.01) + Number(this.b * this.M) - this.b * skillm )) + Number(this.BFa)
                var crit = Number(this.BCd * 0.01) + Number(this.a * skillm)
                x = ( Number(this.skillbase) + Number(attack * this.skillmulti) ) * crit * ( Number(this.skillbook) + Number(this.T) ) * 0.01
                return x
            },
            alert: function () {
                addClass(document.getElementById('result'), 'show')
                addClass(document.getElementById('tester'), 'show')
                addClass(document.getElementById('skilltester'), 'show')
            },
            closeAlert: function () {
                removeClass(document.getElementById('result'), 'show')
                removeClass(document.getElementById('tester'), 'show')
                removeClass(document.getElementById('skilltester'), 'show')
            },
            reset: function () {
                window.location.href = "index.html#" + this.hero
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
                    this.uwtemp[id] = [0, 0, 0]
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
                        this.uttemp[id][utno] = [0, 0, 0]
                        utforid = this.uttemp[id][utno]
                    }
                } else {
                    this.uttemp[id] = {
                        "s1": [0, 0, 0],
                        "s2": [0, 0, 0],
                        "s3": [0, 0, 0],
                        "s4": [0, 0, 0]
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
                arraym = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
                arrayf = arraym.map(a => this.calcf(a))
                Plotly.react(TESTER, [{
                    x: arraym,
                    y: arrayf
                }], {
                        margin: { t: 0 }
                    });
                arrayskillf = arraym.map(a => this.calcskillf(a))
                Plotly.react(SKILLTESTER, [{
                    x: arraym,
                    y: arrayskillf
                }], {
                        margin: { t: 0 }
                    });
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
}


/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}