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
//$.getJSON("data/hero.json").done(function (data) {
$.getJSON("https://raw.githubusercontent.com/kuroganechong/Kiseki/master/src/data/hero.json").done(function (data) {
    jsonval = data['0']

    var heronames = { "Kasel": "1", "Frey": "2", "Cleo": "3", "Roi": "4", "Gau": "5", "Phillop": "6", "Lakrak": "7", "Kaulah": "8", "Epis": "9", "Selene": "10", "Maria": "11", "Miruru": "12", "Lorraine": "13", "Clause": "15", "Rephy": "16", "Dimael": "17", "Reina": "18", "Pavel": "19", "Demia": "20", "Naila": "21", "Rodina": "22", "Morrah": "23", "Baudouin": "24", "Jane": "25", "Aisha": "26", "Leo": "27", "Fluss": "28", "Luna": "29", "Laias": "30", "Arch": "31", "Lewisia": "32", "Nyx": "33", "Annette": "34", "Mitra": "35", "Ricardo": "36", "Tanya": "37", "Ezekiel": "38", "Cassandra": "39", "Theo": "40", "Mediana": "41", "Oddy": "42", "Viska": "43", "Priscilla": "44", "Yanne": "45", "Zafir": "46", "Ophelia": "49", "Requina": "50", "Aselica": "51", "Crow": "52", "Shamilla": "53", "Seria": "55", "Erze": "56", "Lilia": "57", "Laudia": "58", "Lucias": "59", "Chrisha": "60", "Neraxis": "61", "Scarlet": "62", "Sonia": "63", "Artemia": "64", "Mirianne": "65", "Shea": "66", "Kara": "67", "Nia": "68", "Chase": "73", "May": "90", "Gladi": "91", "Veronica": "92", "Loman": "93", "Juno": "94", "Nicky": "95" }

    var heroclass = { "1": "2", "2": "7", "3": "6", "4": "4", "5": "2", "6": "1", "7": "5", "8": "7", "9": "4", "10": "3", "11": "6", "12": "5", "13": "6", "15": "1", "16": "7", "17": "3", "18": "4", "19": "6", "20": "1", "21": "2", "22": "5", "23": "1", "24": "7", "25": "1", "26": "6", "27": "7", "28": "4", "29": "3", "30": "7", "31": "3", "32": "6", "33": "6", "34": "5", "35": "5", "36": "1", "37": "4", "38": "4", "39": "7", "40": "2", "41": "7", "42": "5", "43": "2", "44": "2", "45": "3", "46": "3", "49": "6", "50": "3", "51": "1", "52": "5", "53": "3", "55": "2", "56": "4", "57": "6", "58": "4", "59": "7", "60": "5", "61": "1", "62": "2", "63": "1", "64": "6", "65": "4", "66": "7", "67": "5", "68": "4", "73": "2", "90": "7", "91": "4", "92": "6", "93": "1", "94": "7", "95": "2" }

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
                <label class="clickLabel" v-bind:for="String(51) + post.ally + post.id">Light: <span v-if="post.t5[1][0] != 0">ATK {{ post.t5[1][0] }}%</span><span v-if="post.t5[1][1] != 0"> CDMG {{ post.t5[1][1] }}%</span><span v-if="post.t5[1][2] != 0"> Flat ATK {{ post.t5[1][2] }}</span></label>\
                <input type="checkbox" v-bind:id="String(52) + post.ally + post.id" v-bind:value="post.t5[2]" v-on:click="clickT5(String(52) + post.ally + post.id)">\
                <label class="clickLabel" v-bind:for="String(52) + post.ally + post.id">Dark: <span v-if="post.t5[2][0] != 0">ATK {{ post.t5[2][0] }}%</span><span v-if="post.t5[2][1] != 0"> CDMG {{ post.t5[2][1] }}%</span><span v-if="post.t5[2][2] != 0"> Flat ATK {{ post.t5[2][2] }}</span></label>\
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
                </div>\
                </div>\
                </div>',
        methods: {
            selUW: function (id) {
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
            }
        },
        computed: {
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
                return x
            },
            T: function () {
                var x = 0
                x = Number(100) + Number(this.scale) + Number(this.art_3)
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
                x = Number(this.Fa) + Number(this.skillfa) + Number(this.wa3fa)
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
                x = Number(200) + Number(this.addcdmg) + Number(this.art_2) + Number(this.skillcdmg) + Number(this.perkcdmg) + Number(this.statcdmg)
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
            atkfocus: function () {
                var der_a = this.statatk * this.Cd * 0.01
                var der_c = Number(this.statatk * this.BATK * 0.01) + Number(this.BFa)

                if (der_a - der_c > 0) {
                    return 1
                } else if (der_a - der_c < 0) {
                    return 0
                } else {
                    return 2
                }
            },
            skillf: function () {
                var x = 0
                x = (Number((Number(this.statatk * this.BATK * 0.01) + Number(this.BFa)) * this.skillmulti) + Number(this.skillbase)) * this.Cd * 0.01 * (Number(this.skillbook * 0.01) + Number(this.T * 0.01))
                return Math.round(x)
            },
            skillatkfocus: function () {
                var der_a = this.statatk * this.Cd * 0.01 * this.skillmulti
                var der_c = Number(Number(this.statatk * this.BATK * 0.01) * this.skillmulti + Number(this.BFa) * this.skillmulti) + Number(this.skillbase)

                if (der_a - der_c > 0) {
                    return 1
                } else if (der_a - der_c < 0) {
                    return 0
                } else {
                    return 2
                }
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
            penfocus: function () {
                var der_a = this.statatk * this.Cd * (this.defreduce) * 0.01
                var der_c = (Number(this.statatk * this.BATK * 0.01) + Number(this.BFa)) * (this.defreduce)
                var der_p = this.percfpen * 100 * this.pref

                var arr = [der_a, der_c, der_p];
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