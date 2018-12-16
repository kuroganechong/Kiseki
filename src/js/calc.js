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
$.getJSON("data/hero.json").done(function (data) {
    jsonval = data['0']

    var heronames = { "Kasel": "1", "Frey": "2", "Cleo": "3", "Roi": "4", "Gau": "5", "Phillop": "6", "Lakrak": "7", "Kaulah": "8", "Epis": "9", "Selene": "10", "Maria": "11", "Miruru": "12", "Lorraine": "13", "Clause": "15", "Rephy": "16", "Dimael": "17", "Reina": "18", "Pavel": "19", "Demia": "20", "Naila": "21", "Rodina": "22", "Morrah": "23", "Baudouin": "24", "Jane": "25", "Aisha": "26", "Leo": "27", "Fluss": "28", "Luna": "29", "Laias": "30", "Arch": "31", "Lewisia": "32", "Nyx": "33", "Annette": "34", "Mitra": "35", "Ricardo": "36", "Tanya": "37", "Ezekiel": "38", "Cassandra": "39", "Theo": "40", "Mediana": "41", "Oddy": "42", "Viska": "43", "Priscilla": "44", "Yanne": "45", "Zafir": "46", "Ophelia": "49", "Requina": "50", "Aselica": "51", "Crow": "52", "Shamilla": "53", "Seria": "55", "Erze": "56", "Lilia": "57", "Laudia": "58", "Lucias": "59", "Chrisha": "60", "Neraxis": "61", "Scarlet": "62", "Sonia": "63", "Artemia": "64", "Mirianne": "65", "Shea": "66", "Kara": "67", "Nia": "68", "Chase": "73", "May": "90", "Gladi": "91", "Veronica": "92", "Loman": "93", "Juno": "94", "Nicky": "95" }

    var post = Vue.component('hero', {
        props: ['post', 'hero'],
        data: function () {
            return { c: 0 }
        },
        template: '<div v-if="(post.ally == 1 && post.id != hero) || (post.ally != 1 && post.id == hero)">\
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
                x = true // isempty
                if (verbose) {
                    console.log(object)
                }
                // inside each skill: 1,2,3,4

                if (!isNaN(object[0])) {
                    var sum = Number(object[0]) + Number(object[1]) + Number(object[2])
                    if (sum != 0) {
                        x = false
                    }
                } else {
                    for (const key in object) {
                        if (object.hasOwnProperty(key)) {
                            const element = object[key];
                            if (!Array.isArray(element[0])) {
                                // 1,2,3
                                var sum = element.reduce(getSum);
                                if (sum != 0) {
                                    x = false
                                }
                            } else {
                                //4
                                for (let index = 0; index < element.length; index++) {
                                    element[index].reduce(getSum);
                                    if (sum != 0) {
                                        x = false
                                    }
                                }
                            }
                        }
                    }
                }
                return !x
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
            cl: '1',
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
            obs: 0,
            heroscale: 1
        },
        computed: {
            perkatk: function () {
                var x = 0
                if (this.perk1) {
                    x = Number(x) + Number(30)
                }
                if (this.cl == 2 && this.perk2.includes("wa2")) {
                    x = Number(x) + Number(this.wa2)
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
            BFa: function () {
                var x = 0
                // sum of all flat ATK buff
                x = Number(this.Fa) + Number(this.skillfa)
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
            }
        },
        components: {
            post: post
        },
        methods: {
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
            calibrate: function(){
                if(this.pref == 0){
                    console.log('divide by zero error')
                    return
                }
                this.heroscale = this.obs/this.pref
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
            })
        }
    })
});