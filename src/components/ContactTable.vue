<template>
  <div class="table-main">
    <div class="d-flex justify-end">
      <v-btn
          class="mb-4"
          color="success"
          @click="$emit('open-form')"
      >
        Add
      </v-btn>
    </div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left cursor-pointer" @click="sort('name')">
              Name
              <v-icon v-if="sorting.name !== 'default'" size="14">mdi-chevron-{{sorting.name}}</v-icon>
            </th>
            <th class="text-left cursor-pointer" @click="sort('phone')">
              Phone
              <v-icon v-if="sorting.phone !== 'default'" size="14">mdi-chevron-{{sorting.phone}}</v-icon>
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-for="contact in sortContacts">
            <tr :key="contact.id">
              <td>{{ contact.name }}</td>
              <td>{{ contact.phone }}</td>
            </tr>
            <tr
              v-for="contact in getContactById(...contact.workersId)"
              :key="contact.id"
              class="sub-item"
            >
              <td style="height: 40px" class="pl-7 d-flex align-center">
                <v-icon size="14">mdi-subdirectory-arrow-right</v-icon>
                <span class="ml-2">
                  {{ contact.name }}
                </span>
              </td>
              <td style="height: 40px">{{ contact.phone }}</td>
            </tr>
          </template>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const sorts = ['default', 'down', 'up']
/**
 *  Get sort function by field
 * @param {'name' | 'phone'} field
 * @param {'default' | 'up' | 'down'} direction
 */
function getSortFunc(field, direction) {
  return (a, b) => {
    if (!['down', 'up'].includes(direction)) return 0
    if(a[field] < b[field]) { return direction === 'down' ?  -1 : 1 }
    if(a[field] > b[field]) { return direction === 'down' ?  1 : -1 }
    return 0
  }
}

export default {
  name: 'ContactTable',
  props: {
    contacts: Array
  },
  data() {
    return {
      sorting: {
        name: sorts[0],
        phone: sorts[0],
      },
    }
  },
  computed: {
    ...mapGetters(['getContactById', 'contactsWithoutBoss']),
    sortContacts() {
      return [...this.contactsWithoutBoss]
        .sort(getSortFunc('name', this.sorting.name))
        .sort(getSortFunc('phone', this.sorting.phone))
    }
  },
  methods: {
    /**
     *  Sort by field
     * @param {'name' | 'phone'} field
     */
    sort(field) {
      const newIndex = sorts.findIndex((s) => s === this.sorting[field]) + 1
      this.clearSort();
      this.sorting[field] = sorts[newIndex] || sorts[0]
    },
    clearSort() {
      this.sorting = { name: sorts[0], phone: sorts[0] }
    },
  }
}
</script>

<style lang="scss" scoped>
.table-main {
  .sub-item {
    background: #f3f3f3;
  }
}
</style>