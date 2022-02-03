<!--
 @fileoverview A component that is used when choosing the tags for an accuracy assessment. 
-->
<template>

  <v-autocomplete v-model="targets" :items="populationList" dense
  filled small-chips color="blue-grey lighten-2" :filter="filterFollowersLists"
  item-text="text" item-value="value" multiple :no-data-text="textWhenNoData">

    <template v-slot:label>
      <span class="subtitle-2">
        {{audienceLabel}}
      </span>
    </template>
    <template slot="selection" slot-scope="data" >
      <v-chip
        :input-value="data.selected" close
        class="chip--select-multi"
        @click:close="remove(data.item)" >

        <template>
          <v-avatar left v-if="data.item.value.type === 'Source'">
            <custom-avatar :user="data.item.value.SourceObj" :clickEnabled="false" :size="25"></custom-avatar>
          </v-avatar>
          <span class="caption">{{ data.item.text }}</span>
        </template>

      </v-chip>
    </template>

    <template slot="item" slot-scope="data">

      <template v-if="typeof data.item !== 'object'">
        <v-list-item-content v-text="data.item"></v-list-item-content>
      </template>

      <template v-else>

        <v-list-item-avatar v-if="data.item.value.type === 'Source'" class="custom-list-avatar my-1">
          <custom-avatar :user="data.item.value.SourceObj" :clickEnabled="false"
          :size="30"></custom-avatar>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-html="data.item.text"></v-list-item-title>
        </v-list-item-content>
      </template>

    </template>

  </v-autocomplete>

</template>

<script>
import customAvatar from '@/components/CustomAvatar'
import { mapState, mapActions } from 'vuex';
import sourceHelpers from '@/mixins/sourceHelpers'

export default {
  components: {
    'custom-avatar': customAvatar
  },
  props: {
    population: {
      type: String
    },
    accuracy: {
      type: Boolean
    }
  },
  data () {
    return {
      /*
      the selected sources will be in this variable and the parent component needs to access this variable
      using refs. I have opted for the parent reaching into the child's state rather than the child emitting
      events here because it is not clear when the user is done making changes to their target list.
      */
      targets: []
    }
  },
  created() {
    if (!this.followers.length)
      this.fetchFollowers();
    if (!this.trustedSources)
      this.fetchTrusteds();
    if (!this.followedSources)
      this.fetchFollows();
  },
  computed: {
    populationList: function() {

      let data = [];
      if (this.accuracy == 3) {
        data.push({ header: 'Accurate on the evidence' });
        data.push({text: "I have a high degree of knowledge on this topic that allows me to assess this claim myself.", value: {type: "Tag", identifier: "1"}});
        data.push({text: "I have firsthand knowledge of the subject or am an eyewitness.", value: {type: "Tag", identifier: "2"}});
        data.push({text: "My other trusted sources confirm the entire claim.", value: {type: "Tag", identifier: "3"}});
        data.push({text: "The claim is from a source I trust.", value: {type: "Tag", identifier: "4"}});
        data.push({text: "Evidence presented in the article corroborates the claim.", value: {type: "Tag", identifier: "5"}});

        data.push({ divider: true });
        data.push({ header: 'Plausible' });
        data.push({text: "The claim is consistent with my past experience and observations.", value: {type: "Tag", identifier: "6"}});

        data.push({ divider: true });
        data.push({ header: 'Don\'t know' });

        data.push({text: "I'm not sure, but I want the claim to be true.", value: {type: "Tag", identifier: "7"}});
        data.push({text: "I was just guessing.", value: {type: "Tag", identifier: "8"}});

        data.push({ divider: true });
        data.push({ header: 'Other' });
        data.push({text: "Other", value: {type: "Tag", identifier: "9"}});
      }

      else {
        data.push({ header: 'Inaccurate by contrary knowledge' });
        data.push({text: "I have a high degree of knowledge on this topic that allows me to assess this claim myself.", value: {type: "Tag", identifier: "-1"}});
        data.push({text: "I have firsthand knowledge of the subject or am an eyewitness.", value: {type: "Tag", identifier: "-2"}});
        data.push({text: "The claim contradicts some information related to the case that I know from trusted sources.", value: {type: "Tag", identifier: "-3"}});

        data.push({ divider: true });
        data.push({ header: 'Implausible' });
        data.push({text: "The claim is not consistent with my past experience and observations.", value: {type: "Tag", identifier: "-4"}});
        data.push({text: "If this were true, I would have heard about it.", value: {type: "Tag", identifier: "-5"}});
        data.push({text: "The claim appears to be inaccurate based on its presentation.", value: {type: "Tag", identifier: "-6"}});
        data.push({text: "The claim appears motivated or biased.", value: {type: "Tag", identifier: "-7"}});
        data.push({text: "The claim references something that is impossible to prove.", value: {type: "Tag", identifier: "-8"}});

        data.push({ divider: true });
        data.push({ header: 'Don\'t know' });

        data.push({text: "I'm not sure, but I do not want the claim to be true.", value: {type: "Tag", identifier: "-9"}});
        data.push({text: "I was just guessing.", value: {type: "Tag", identifier: "-10"}});

        data.push({ divider: true });
        data.push({ header: 'Other' });
        data.push({text: "Other", value: {type: "Tag", identifier: "-11"}});      }

      return data;
    },
    textWhenNoData: function() {
        return 'No tags found';
    },
    audienceLabel: function() {
      return 'Select all valid tags'
    },
    ...mapState('relatedSources', [
     'followers',
     'trustedSources',
     'followedSources'
   ]),
   ...mapState('sourceLists', [
     'sourceLists'
   ])
  },
  methods: {
    remove: function(item) {
      if (typeof item.value !== 'undefined') {
        const index = this.targets.map(el => el.identifier).indexOf(item.value.identifier);
        if (index > -1)
          this.targets.splice(index, 1);
      }
    },
    ...mapActions('relatedSources', [
      'fetchFollowers',
      'fetchTrusteds',
      'fetchFollows'
    ])
  },
  mixins : [sourceHelpers]
}
</script>

<style scoped>
.prompt-text {
  font-size: 0.7em !important;
  margin-top: 10%;
}
</style>