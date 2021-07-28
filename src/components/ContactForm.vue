<template>
  <v-card class="pa-6">
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <div class="mb-4 d-flex justify-space-between align-center">
        <div>Add contact</div>
        <v-btn icon @click="$emit('close')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <div class="d-flex flex-column">
        <div>
          <div>Name</div>
          <v-text-field
              v-model="contact.name"
              :rules="[v => !!v || 'Should not be empty']"
              placeholder="Enter name"
              required
              outlined
              dense
          />
        </div>
        <div>
          <div>Phone</div>
          <vue-tel-input-vuetify
              v-model="contact.phone"
              placeholder="+7 999 999-99-99"
              :rules="phoneRules"
              :onlyCountries="['RU']"
              :maxLen="12"
              label=""
              required
              outlined
              dense
          />
        </div>
        <div>
          <div>Boss</div>
          <v-select
              v-model="contact.bossId"
              :items="contacts"
              placeholder="Enter boss"
              clearable
              item-text="name"
              item-value="id"
              outlined
              dense
          />
        </div>
      </div>
      <div class="d-flex justify-end">
        <v-btn color="success" @click="createContact">Save</v-btn>
        <v-btn class="ml-4" color="error" @click="$emit('close')">Cancel</v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<script>
const regPhone = /(\+7|8)[- _]*\(?[- _]*(\d{3}[- _]*\)?([- _]*\d){7}|\d\d[- _]*\d\d[- _]*\)?([- _]*\d){6})/

export default {
  name: 'ContactForm',
  props: {
    contacts: Array
  },
  data() {
    return {
      contact: {
        name: '',
        phone: '',
        bossId: null
      },
      valid: true,
      phoneRules: [
        v => !!v || 'Enter phone',
        v => (v && regPhone.test(v)) || 'Incorrect format',
      ],
    }
  },
  methods: {
    createContact() {
      if (!this.$refs.form.validate()) return
      this.$emit('close')
      this.$emit('create', this.contact)
      this.contact = {
        name: '',
        phone: '',
        bossId: null
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.form-labels {
  width: 150px;
}
.form-inputs {
  width: 100%;
}
</style>