<template>

  <div>

    <v-divider v-if="sortedAssessments.questioned.length"></v-divider>

    <v-row v-if="sortedAssessments.questioned.length" row wrap class="pa-1" no-gutters>
      <v-col cols="12">
        <v-card-title>
         <div>
           <p class="body-2 font-weight-medium mb-1">Questioned</p>
         </div>
       </v-card-title>

       <template v-for="assessment in getAssessmentsSlice('questioned')" >
         <inner-assessment :assessmentObj="assessment" :assessmentsNamespace="assessmentsNamespace" :commentsNamespace="commentsNamespace"
          :key="assessment.lastVersion.id" assessmentType="question"></inner-assessment>
          <v-divider :key="`divider-${assessment.lastVersion.id}`"></v-divider>
          
       </template>

      </v-col>
    </v-row>

    <v-row v-if="sortedAssessments.questioned.length != 0" row class="pa-1" no-gutters>
      <span v-if="assessmentsRemaining('questioned')" @click="revealMore('questioned')"
        class="blue--text text--darken-3 body-2 interactable">
        Show More Assessments</span>
      <v-spacer></v-spacer>
      <span class="caption grey--text text--darken-3 pr-1"> {{getAssessmentStats('questioned')}} </span>
    </v-row>

    <v-card height="10px">
      <v-divider></v-divider>
    </v-card>

    <v-row no-gutters>
      <v-col cols="6">
        <v-card outlined :color="yesSelected ? 'lime lighten-3' : 'white'" @click="selectYes">
          <v-row justify="center" no-gutters>
            <p class="pb-0 mb-0 subheading font-weight-medium">Yes</p>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="6">
        <v-card outlined :color="!yesSelected ? 'lime lighten-3' : 'white'" @click="selectNo">
          <v-row justify="center" no-gutters>
            <p class="pb-0 mb-0 subheading font-weight-medium">No</p>
          </v-row>
        </v-card>
      </v-col>

      <template class="container" v-if="yesSelected">
                <div class="icons">

          <v-tooltip bottom>
          <div @click="setColYes(1)"><v-img class="images" src="../../public/images/graduation-cap.png" :style="{ backgroundColor: this.filteredYes[1] }"> </v-img></div>
          <span> blah blah </span>
          </v-tooltip>

          <div @click="setColYes(2)"><font-awesome-icon class="images" icon="fa-solid fa-graduation-cap" size='xl' :style="{ backgroundColor: this.filteredYes[2] }"/></div>

          <!-- <div @click="setColYes(2)"><v-img class="images" src="../../public/images/shared-vision.png" :style="{ backgroundColor: this.filteredYes[2] }"> </v-img></div> -->
          <div @click="setColYes(3)"><v-img class="images" src="../../public/images/people.png" :style="{ backgroundColor: this.filteredYes[3] }"> </v-img></div>
          <div @click="setColYes(4)"><v-img class="images" src="../../public/images/shield.png" :style="{ backgroundColor: this.filteredYes[4] }"> </v-img></div>
          <div @click="setColYes(5)"><v-img class="images" src="../../public/images/fingerprint.png" :style="{ backgroundColor: this.filteredYes[5] }"> </v-img></div>
          <div @click="setColYes(6)"><v-img class="images" src="../../public/images/fast-time.png" :style="{ backgroundColor: this.filteredYes[6] }"> </v-img></div>
          <div @click="setColYes(7)"><v-img class="images" src="../../public/images/christmas-star.png" :style="{ backgroundColor: this.filteredYes[7] }"> </v-img></div>
          <div @click="setColYes(8)"><v-img class="images" src="../../public/images/question (1).png" :style="{ backgroundColor: this.filteredYes[8] }"> </v-img></div>
          <div @click="setColYes(9)"><v-img class="images" src="../../public/images/other.png" :style="{ backgroundColor: this.filteredYes[9] }"> </v-img></div>
        </div>
        <!-- <div class="icons" v-for='index in 10' :key='index'>
          <v-img class="images" src="../../public/images/ear.png" width=25 height=25> </v-img>
        </div> -->

        <div class="assess">

        <template v-for="assessment in getAssessmentsSlice('confirmed')" >
          <inner-assessment :assessmentObj="assessment" :assessmentsNamespace="assessmentsNamespace" :commentsNamespace="commentsNamespace"
          :key="assessment.lastVersion.id" :assessmentType="key"></inner-assessment>
          <v-divider :key="`divider-${assessment.lastVersion.id}`" class="center-align"></v-divider>
        </template>

        <v-row no-gutters class="pa-1">
          <span v-if="assessmentsRemaining('confirmed')" @click="revealMore('confirmed')"
            class="blue--text text--darken-3 body-2 interactable">
            Show More Assessments</span>
          <v-spacer></v-spacer>
          <span class="caption grey--text text--darken-3 pr-1"> {{getAssessmentStats('confirmed')}} </span>
        </v-row>

        </div>
        

      </template>

      <template v-if="!yesSelected">
        <div class="icons">

          <v-tooltip bottom>
                  <div v-bind="on" @click="setCol(1)"><v-img class="images-no" src="../../public/images/graduation-cap.png" :style="{ backgroundColor: this.filtered[1] }"> </v-img></div>
              </v-tooltip>

              <font-awesome-icon icon="fa-solid fa-graduation-cap" />

          <div @click="setCol(2)"><v-img class="images-no" src="../../public/images/shared-vision.png" :style="{ backgroundColor: this.filtered[2] }"> </v-img></div>
          <div @click="setCol(3)"><v-img class="images-no" src="../../public/images/shield (2).png" :style="{ backgroundColor: this.filtered[3] }"> </v-img></div>
          <div @click="setCol(4)"><v-img class="images-no" src="../../public/images/fast-time.png" :style="{ backgroundColor: this.filtered[4] }"> </v-img></div>
          <div @click="setCol(5)"><v-img class="images-no" src="../../public/images/ear.png" :style="{ backgroundColor: this.filtered[5] }"> </v-img></div>
          <div @click="setCol(6)"><v-img class="images-no" src="../../public/images/mess.png" :style="{ backgroundColor: this.filtered[6] }"> </v-img></div>
          <div @click="setCol(7)"><v-img class="images-no" src="../../public/images/demon.png" :style="{ backgroundColor: this.filtered[7] }"> </v-img></div>
          <div @click="setCol(8)"><v-img class="images-no" src="../../public/images/impossible-triangle.png" :style="{ backgroundColor: this.filtered[8] }"> </v-img></div>
          <div @click="setCol(9)"><v-img class="images-no" src="../../public/images/christmas-star.png" :style="{ backgroundColor: this.filtered[9] }"> </v-img></div>
          <div @click="setCol(10)"><v-img class="images-no" src="../../public/images/question (1).png" :style="{ backgroundColor: this.filtered[10] }"> </v-img></div>
          <div @click="setCol(11)"><v-img class="images-no" src="../../public/images/other.png" :style="{ backgroundColor: this.filtered[11] }"> </v-img></div>
        </div>

        <div class='assess'>

        <template v-for="assessment in getAssessmentsSlice('refuted')" >
              <inner-assessment :assessmentObj="assessment" :assessmentsNamespace="assessmentsNamespace" :commentsNamespace="commentsNamespace"
              :key="assessment.lastVersion.id" :assessmentType="key"></inner-assessment>
              <v-divider :key="`divider-${assessment.lastVersion.id}`" class="center-align"></v-divider>
            </template>

            <v-row no-gutters class="pa-1">
              <span v-if="assessmentsRemaining('refuted')" @click="revealMore('refuted')"
                class="blue--text text--darken-3 body-2 interactable">
                Show More Assessments</span>
              <v-spacer></v-spacer>
              <span class="caption grey--text text--darken-3 pr-1"> {{getAssessmentStats('refuted')}} </span>
            </v-row>

        </div>

      </template>

      <!-- <template v-for="(key, index) in ['confirmed', 'refuted']" >
        <v-col :key="index" :xs6="isDebated" :xs12="!isDebated" v-if="sortedAssessments[key].length != 0">

          <v-card class="assessment-col" outlined> -->


            <!-- <v-card-title>
             <div>
               <p class="mb-1 body-2 font-weight-medium" v-if="key == 'confirmed'"> Yes</p>
               <p class="mb-1 body-2 font-weight-medium" v-else-if="key == 'refuted'"> No</p>
             </div>
           </v-card-title> -->

           <!-- <v-divider></v-divider>

            <template v-for="assessment in getAssessmentsSlice(key)" >
              <inner-assessment :assessmentObj="assessment" :assessmentsNamespace="assessmentsNamespace" :commentsNamespace="commentsNamespace"
              :key="assessment.lastVersion.id" :assessmentType="key"></inner-assessment>
              <v-divider :key="`divider-${assessment.lastVersion.id}`" class="center-align"></v-divider>
            </template>

            <v-row no-gutters class="pa-1">
              <span v-if="assessmentsRemaining(key)" @click="revealMore(key)"
                class="blue--text text--darken-3 body-2 interactable">
                Show More Assessments</span>
              <v-spacer></v-spacer>
              <span class="caption grey--text text--darken-3 pr-1"> {{getAssessmentStats(key)}} </span>
            </v-row> -->

         <!-- </v-card>

        </v-col>
      </template> -->

    </v-row>

  </div>

</template>

<script>
import innerAssessment from '@/components/InnerAssessment'
import utils from '@/services/utils'
import { mapState, mapActions } from 'vuex'
import Vue from 'vue'

export default {
  components: {
   'inner-assessment': innerAssessment
  },
  props: {
    assessmentsNamespace: {
      type: String,
      required: true
    },
    commentsNamespace: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      revealedSize: {},
      yesSelected: false,
      filtered: ['red','red','red','red','red','red','red','red','red','red','red','red','red','red'],
      filteredYes: ['green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green', 'green']
      // noPics: ['ear', 'ear', 'ear', 'ear', 'ear', 'ear', 'ear', 'ear', 'ear', 'ear', 'ear', 'ear']
    }
  },
  computed: {
    sortedAssessments: function() {
      let sortedAssessments = {};
      for (const [key, value] of Object.entries(this.assessments))
        sortedAssessments[key] = this.assessments[key].slice().sort(utils.compareAssessments);

      return sortedAssessments;
    },
    isDebated: function () {
      return this.assessments.confirmed.length && this.assessments.refuted.length;
    },
    assessments: function() {
      return this.state.assessments;
    },
    ...mapState({
       state (state) {
         return state[this.assessmentsNamespace];
       }
    })

  },
  methods: {
    resetRevealedSize: function() {
      this.revealedSize = {'questioned': 4, 'confirmed': 5, 'refuted': 5};
    },
    revealMore: function(key) {
      this.revealedSize[key] += 5;
    },
    getAssessmentsSlice: function(key) {
      return this.sortedAssessments[key].slice(0, this.revealedSize[key]);
    },
    getAssessmentStats: function(key) {
      return this.getAssessmentsSlice(key).length + ' of ' + this.sortedAssessments[key].length;
    },
    assessmentsRemaining: function(key) {
      return this.getAssessmentsSlice(key).length < this.sortedAssessments[key].length;
    },
    selectYes: function(key) {
      this.yesSelected = true;
    },
    selectNo: function(key) {
      this.yesSelected = false;
    },
    setCol: function(key) {
      if (this.filtered[key] === 'red') {
        Vue.set(this.filtered, key, 'gray');}
      else {Vue.set(this.filtered, key, 'red');}
    },
    setColYes: function(key) {
      if (this.filteredYes[key] === 'green') {
        Vue.set(this.filteredYes, key, 'gray');}
      else {Vue.set(this.filteredYes, key, 'green');}
    },
  },
  watch: {
    assessments: function() {
      this.resetRevealedSize();
    }
  }

}

</script>

<style scoped>
.center-align {
  vertical-align: middle;
}

.right-align {
  text-align: right;
}

#assessment_container {
  right: 0px;
  width: 34%;
  max-height: 95vh;
  min-height: 95vh;
  overflow-y: auto;
  bottom: 0px;
}

.assessment-col {
  overflow-y: scroll;
  max-height: 80vh;
  min-height: 80vh;
}

.assessment-col:first-child {
  border-right: 1px solid #B0BEC5;
}

.clear-sign {
  position: absolute;
}

.icons {
  border-radius: 50%;
  height: 40px;
  width: 40px;
  margin: 20px;
  display:flex;
  justify-content: space-between;
}

.images {
  text-align: center;
  border-radius: 50%;
  background-color: green;
  margin-right: 15px;
  width: 40px;
}

.images-no {
  text-align: center;
  border-radius: 50%;
  /* background-color: red; */
  margin-right: 10px;
  width: 40px;
}

.assess {
  padding-top: 100px;
}

</style>
