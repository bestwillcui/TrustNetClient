<!--
 @fileoverview The component containing each assessment in the AssessmentContainer
-->
<template>
  <div class="pa-1" @mouseenter="iconsActive = true" @mouseleave="iconsActive = false">

    <v-row class="mb-n1" align="center" wrap no-gutters>
      <assessor :user="assessmentObj.assessor" :clickEnabled="true" :isTransitive="assessmentObj.lastVersion.isTransitive"
        :credibilityValue="assessmentObj.lastVersion.postCredibility" class="mb-1">
      </assessor>
      
      <span v-if="assessmentType == 'question' && assessmentObj.lastVersion.sourceIsAnonymous" 
        class="ml-2 mr-1 caption grey--text text--darken-3"> Asked anonymously</span>

      <!-- <span v-if="assessmentObj.lastVersion.postCredibility != 0" class="ml-2 mr-1 caption grey--text text--darken-1"> {{confidence}}</span> -->
      <span v-if="assessmentObj.lastVersion.isTransitive" class="ml-2 mr-1 caption grey--text text--darken-1 "> Adopted through their network</span>
      <span class="ml-2 caption grey--text text--darken-3"> {{timestamp}} </span>
      <span v-if="assessmentObj.history && assessmentObj.history.length"
      class="ml-2 caption grey--text text--darken-1 interactable" @click.stop="showHistory">
        Edited</span>
    </v-row>

    <v-row v-if="assessmentObj.lastVersion.body" no-gutters class="pa-1 pb-2 body-2 assessment-text">
      <v-col cols="12">

        <v-row v-if="!showFullText && bodyWordCount > 25" class="ma-0">
          <p v-html="truncatedText" class="assessment-text-inner mb-0"></p>
          <span class="blue--text text--darken-3 interactable" @click="showFullText = true">
            show more
          </span>
        </v-row>
        <v-row v-else class="ma-0" >
          <p v-html="assessmentObj.lastVersion.body" class="assessment-text-inner mb-0">
          </p>
            <span v-if="bodyWordCount > 25" class="blue--text text--darken-3 interactable"
             @click="showFullText = false">
            show less
          </span>
        </v-row>
      </v-col>

      <v-textarea v-if="replying" placeholder="Add a reply here..." outlined auto-grow rows="1" :autofocus="true" dense v-model="replyText" hide-details="auto" color="blue" style="font-size: 14px; width: 500px" class="pt-5 assessment-text-inner">
        <template slot="append">
          <v-icon @click="sendReply" color="blue">mdi-send</v-icon>
          <v-icon @click="replying = false; replyText = ''" color="red">clear</v-icon>
        </template>
      </v-textarea>

      <v-row :style="iconsActive && !replying ? 'visibility: visible' : 'visibility: hidden'" class="mt-n7 justify-end" align="center" wrap no-gutters>
        <v-btn style="z-index: 5" @click.stop="replying = true; iconsActive = false" icon>
          <v-icon style="z-index: 5" class="xs-icon-font" color="blue">fa-reply</v-icon>
        </v-btn>
        <!-- <v-btn v-if="isUser" style="z-index: 5" @click.stop="editing = true; iconsActive = false" icon>
          <v-icon style="z-index: 5" class="s-icon-font" color="blue">edit</v-icon>
        </v-btn>
        <v-btn v-if="isUser" style="z-index: 5" @click.stop="sendDelete(); iconsActive = false" icon>
          <v-icon style="z-index: 5" class="xs-icon-font" color="blue">fa-trash</v-icon>
        </v-btn> -->
      </v-row>

    </v-row>

    <!-- <v-divider></v-divider> -->
  </div>

</template>

<script>
import assessor from '@/components/Assessor'
import timeHelpers from '@/mixins/timeHelpers'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {
   'assessor': assessor
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
    assessmentObj: {
      type: Object,
      required: true
    },
    assessmentType: {
      type: String
    }
  },
  data () {
    return {
      showFullText: false,
      replying: false,
      replyText: "",
      iconsActive: false
    }
  },
  computed: {
    postId() {
      return this.commentState.postIdOfComments;
    },
    timestamp() {
      return this.timeElapsed(
        this.assessmentObj.history.length ? this.assessmentObj.history[this.assessmentObj.history.length - 1].createdAt : this.assessmentObj.lastVersion.createdAt
        );
    },
    truncatedText() {
      return this.assessmentObj.lastVersion.body.split(' ').slice(0, 25).join(' ') + '...';
    },
    bodyWordCount() {
      return this.assessmentObj.lastVersion.body.split(' ').length;
    },
    confidence() {
      let percentage = Math.abs(Math.round(this.assessmentObj.lastVersion.postCredibility * 100));
      return percentage + '% confident';
    },
    isUser() {
      return this.assessmentObj.assessor.id === this.user.id;
    },
    ...mapState({
       commentState (state) {
         return state[this.commentsNamespace];
       }
    }),
    ...mapGetters('auth', [
      'user'
    ])
    // isDeleted() {
    //   return this.commentObj.body === null;
    // }
  },
  methods: {
    showHistory: function() {
      this.populateHistory({
        history: [this.assessmentObj.lastVersion].concat(this.assessmentObj.history),
        assessor: this.assessmentObj.assessor
      });
      this.sethistoryVisibility(true);
    },
    sendReply() {
      this.postComment({
          body: this.replyText,
          repliesTo: this.assessmentObj.lastVersion.id,
          repliesToType: 2
      })
      .then(this.updateComments)
      .then(() => {this.iconsActive = false; this.replying = false; this.replyText = ''})
    },
    updateComments() {
      this.getPostComments({
        postIdOfComments: this.postId
      })
    },
    ...mapActions({
      populateHistory (dispatch, payload) {
        return dispatch(this.assessmentsNamespace + '/populateAssessmentHistory', payload)
      },
      sethistoryVisibility (dispatch, payload) {
        return dispatch(this.assessmentsNamespace + '/setHistoryVisibility', payload)
      },
      getPostComments (dispatch, payload) {
        return dispatch(this.commentsNamespace + '/getPostComments', payload)
      },
      postComment (dispatch, payload) {
        return dispatch(this.commentsNamespace + '/postComment', payload)
      }
    })
  },
  mixins: [timeHelpers]
}

</script>

<style scoped>
.assessment-text p, .assessment-text span {
  font-size: 0.95em;
  line-height: 125%;
}
.center-align {
  vertical-align: middle;
}

.assessment-text-inner {
  white-space: pre-wrap;
  word-break: break-word;
}

</style>
