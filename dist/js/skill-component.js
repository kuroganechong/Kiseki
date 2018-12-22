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

// only for damage boost
var post2 = Vue.component('hero2', {
    props: ['post', 'hero'],
    data: function () {
        return { c: 'dmg' }
    },
    template: '<div v-if="(post.ally != 1) && checkAvailPost(post)">\
                <button class="collapsible" v-bind:id="c + post.id">{{ matchName(post.id) }}</button>\
                <div class="content">\
                <div v-if="checkAvail(post.uw, 0)">\
                UW: <select v-on:change="selUW(String(0) + String(post.ally) + c + String(post.id))" v-bind:id="String(0) + String(post.ally) + c + String(post.id)">\
                <option value="">Please select</option>\
                <option v-for="(uw, star) in post.uw" v-bind:value="uw">{{star}} star: DMG increase {{ uw[3] }}%</option>\
                </select>\
                </div>\
                \
                <div v-if="checkAvail(post.t5[1], 0) || checkAvail(post.t5[2], 0)">\
                T5:\
                <input type="checkbox" v-bind:id="String(51) + post.ally + c + post.id" v-bind:value="post.t5[1]" v-on:click="clickT5(String(51) + post.ally + c + post.id)">\
                <label class="clickLabel" v-bind:for="String(51) + post.ally + c + post.id">\
                Light: \
                <span v-if="post.t5[1].length > 3 && post.t5[1][3] != 0">DMG increase {{ post.t5[1][3] }}%</span>\
                <span v-if="!checkAvail(post.t5[1], 0)"> None</span>\
                </label>\
                <input type="checkbox" v-bind:id="String(52) + post.ally + c + post.id" v-bind:value="post.t5[2]" v-on:click="clickT5(String(52) + post.ally + c + post.id)">\
                <label class="clickLabel" v-bind:for="String(52) + post.ally + c + post.id">\
                Dark: \
                <span v-if="post.t5[2].length > 3 && post.t5[2][3] != 0">DMG increase {{ post.t5[2][3] }}%</span>\
                <span v-if="!checkAvail(post.t5[2], 0)"> None</span>\
                </label>\
                </div>\
                \
                <div v-for="(skill, skillno, index) in post.data" v-bind:key="skillno + post.ally + c + post.id">\
                <div v-if="checkAvail(skill[1], 0) || checkAvail(skill[2], 0) || checkAvail(skill[3], 0) || checkAvail(skill[4], 0)">\
                <label>Skill: {{ skillno.charAt(1) }}</label>\
                </div>\
                <div v-if="checkAvail(skill[1], 0) || checkAvail(skill[2], 0) || checkAvail(skill[3], 0)">\
                <span><input type="checkbox" v-on:click="onClick(1 + skillno + post.ally + c + post.id, skill[1], c + post.id)" v-bind:value="skill[1]" v-bind:id="1 + skillno + post.ally + c + post.id" v-bind:ref="1 + skillno + post.ally + c + post.id">\
                    <label class="clickLabel" v-bind:for="1 + skillno + post.ally + c + post.id" v-bind:id="11 + skillno + post.ally + c + post.id">\
                        Base skill: \
                        <span v-if="skill[1].length > 3 && skill[1][3] != 0">DMG increase {{ skill[1][3] }}%</span>\
                        <span v-if="!checkAvail(skill[1], 0)"> None</span>\
                    </label>\
                </span><br>\
                <span>\
                <input type="checkbox" v-on:click="onClick(2 + skillno + post.ally + c + post.id, skill[2], c + post.id)" v-bind:value="skill[2]" v-bind:id="2 + skillno + post.ally + c + post.id" v-bind:ref="2 + skillno + post.ally + c + post.id">\
                    <label class="clickLabel disable" v-bind:for="2 + skillno + post.ally + c + post.id" v-bind:id="22 + skillno + post.ally + c + post.id">\
                        Light perk: \
                        <span v-if="skill[2].length > 3 && skill[2][3] != 0">DMG increase {{ skill[2][3] }}%</span>\
                        <span v-if="!checkAvail(skill[2], 0)"> None</span>\
                    </label>\
                </span><br>\
                <span>\
                <input type="checkbox" v-on:click="onClick(3 + skillno + post.ally + c + post.id, skill[3], c + post.id)" v-bind:value="skill[3]" v-bind:id="3 + skillno + post.ally + c + post.id" v-bind:ref="3 + skillno + post.ally + c + post.id">\
                    <label class="clickLabel disable" v-bind:for="3 + skillno + post.ally + c + post.id" v-bind:id="33 + skillno + post.ally + c + post.id">\
                        Dark perk: \
                        <span v-if="skill[3].length > 3 && skill[3][3] != 0">DMG increase {{ skill[3][3] }}%</span>\
                        <span v-if="!checkAvail(skill[3], 0)"> None</span>\
                    </label>\
                </span><br>\
                </div>\
                <div v-if="checkAvail(skill[4], 0)">\
                UT: <select v-on:change="selUT(9 + skillno + post.ally + c + post.id, skillno)" v-bind:id="9 + skillno + post.ally + c + post.id">\
                <option value="">No UT</option>\
                <option v-for="(ut, star) in skill[4]" v-bind:value="ut">{{star}} star: DMG increase {{ ut[3] }}%</option>\
                </select>\
                </div>\
                <span class="small" v-if="post.id == 68 && skillno.charAt(1) == 4">\
                Note: DMG increase is sum of both Normal and Enhanced version of S2\
                </span>\
                <span class="small" v-if="post.id == 92 && skillno.charAt(1) == 4">\
                Note: UW and S4 gives DMG increase only when S2 and S3 is active\
                </span>\
                </div>\
                </div>\
                </div>', // 68 is nia, 92 is veronica
    methods: {
        selUW: function (id) {
            data = document.getElementById(id).value
            data = data.split(",")
            if (data.length > 3) {
                this.$emit('selecteddmg', data[3], id)
            } else {
                this.$emit('selecteddmg', 0, id)
            }
        },
        clickT5: function (id) {
            var data
            if (document.getElementById(id).checked) {
                data = document.getElementById(id).value
                data = data.split(",")
                if (data.length > 3) {
                    this.$emit('clickedt5dmg', data[3])
                } else {
                    this.$emit('clickedt5dmg', 0)
                }
            } else {
                data = document.getElementById(id).value
                data = data.split(",")
                if (data.length > 3) {
                    newdata = -data[3]
                    this.$emit('clickedt5dmg', newdata)
                } else {
                    this.$emit('clickedt5dmg', 0)
                }
            }
        },
        selUT: function (id, utno) {
            data = document.getElementById(id).value
            data = data.split(",")
            if (data.length > 3) {
                this.$emit('selectedutdmg', data[3], id, utno)
            } else {
                this.$emit('selectedutdmg', 0, id, utno)
            }
        },
        onClick: function (id, data, parent) {
            if (data.length > 3) {
                data3 = data[3]
            } else {
                data3 = 0
            }
            if (document.getElementById(id).checked) {
                // for 2,3
                if (id.charAt(0) == 2 || id.charAt(0) == 3) {
                    // check if 1 is checked, if yes then pass value up
                    parentid = 1 + id.substr(1)
                    if (document.getElementById(parentid).checked) {
                        this.$emit('clickeddmg', data3)
                        return
                    } else {
                        // Prevent checked children before parent
                        document.getElementById(id).checked = false
                    }
                }
                // for 1
                if (id.charAt(0) == 1) {
                    // if checked pass value up
                    this.$emit('clickeddmg', data3)
                    // set others to unchecked
                    commonid = id.substr(1)
                    document.getElementById(2 + commonid).checked = false
                    document.getElementById(3 + commonid).checked = false
                    removeClass(document.getElementById(22 + commonid), 'disable')
                    removeClass(document.getElementById(33 + commonid), 'disable')
                    addClass(document.getElementById(parent), 'selected')
                    return
                }
            } else {
                // for 2,3,4
                if (id.charAt(0) == 2 || id.charAt(0) == 3) {
                    // check if 1 is checked, if yes then pass value up
                    parentid = 1 + id.substr(1)
                    if (document.getElementById(parentid).checked) {
                        newdata = -data3
                        this.$emit('clickeddmg', newdata)
                        return
                    } else {
                        // Prevent unchecked children before parent
                        document.getElementById(id).checked = true
                    }
                }
                // for 1
                if (id.charAt(0) == 1) {
                    // if unchecked pass value up
                    newdata = -data3
                    this.$emit('clickeddmg', newdata)
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
                    return
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
                if (object.length > 3) {
                    var sum = Number(object[3])
                    if(sum != 0){
                        x = true
                    }
                }
            } else { // for uw,ut
                for (let index = 0; index < object.length; index++) {
                    const element = object[index];
                    if (element.length > 3) {
                        var sum = Number(element[3])
                        if(sum != 0){
                            x = true
                        }
                    }
                }
            }
            return x
        },
        checkAvailPost: function (object) {
            var x = false
            if(this.checkAvail(object.uw, 0)){
                x = true
            }
            if(this.checkAvail(object.t5[1], 0) || this.checkAvail(object.t5[2], 0)){
                x = true
            }
            for (skill in object.data){
                if(this.checkAvail(object.data[skill][1], 0) || this.checkAvail(object.data[skill][2], 0) || this.checkAvail(object.data[skill][3], 0) || this.checkAvail(object.data[skill][4], 0)){
                    x = true
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