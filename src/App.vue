<template>
  <LayoutMain>
    <ContactTable @open-form="dialog = true" />
    <v-dialog v-model="dialog" width="500">
      <ContactForm
        v-if="dialog"
        :contacts="contactsWithoutBoss"
        @close="dialog = false"
        @create="createContact"
      />
    </v-dialog>
  </LayoutMain>
</template>

<script>
import { mapActions, mapGetters} from 'vuex'
import ContactTable from './components/ContactTable'
import ContactForm from './components/ContactForm'
import LayoutMain from "./layout/LayoutMain";

export default {
  name: 'App',
  components: {
    LayoutMain,
    ContactTable,
    ContactForm
  },
  data() {
    return {
      dialog: false
    }
  },
  computed: {
    ...mapGetters(['contactsWithoutBoss']),
  },
  methods: {
    ...mapActions(['createContact']),
  }
}
</script>

<style lang="scss">
  @import "~@/styles";
</style>