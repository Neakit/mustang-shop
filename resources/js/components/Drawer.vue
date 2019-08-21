<template>
  <div class="drawer">
    <div class="search-field">
      <img src="/icons/search-icon.svg" alt="search-icon" />
      <input v-model="search" placeholder="Поиск" />
    </div>
    <div role="tablist">
      <div
        class="card-wrapper card"
        no-body
        v-for="(item, index) in items"
        :key="index"
      >
        <b-row
          role="tab"
          @click="openTab(index)"
          :v-b-toggle="'accordion-' + index"
          class="justify-content-between p-2"
          no-gutters
        >
          <div class="category">{{ item.name }}</div>
          <img
            :class="{ arrowActive: currentTab === index }"
            src="/icons/arrow-icon.svg"
            alt="search-icon"
          />
        </b-row>
        <b-collapse
          :id="'accordion-' + index"
          accordion="my-accordion"
          :visible="isVisible(index)"
          role="tabpanel"
        >
          <div
            v-for="(subItem, index) in item.subItems"
            :key="index"
            class="category-details px-3 py-1"
          >
            <span>{{ subItem.name }}</span>
          </div>
        </b-collapse>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    openTab(index) {
      this.currentTab = index
    }
  },
  computed: {
    isVisible() {
      return (index) => {
        return this.currentTab === index
      }
    }
  },
  data() {
    return {
      text: 'sdf',
      currentTab: 0,
      search: '',
      items: [
        {
          name: 'Acros',
          subItems: [
            {
              name: 'Acros 1'
            },
            {
              name: 'Acros 2'
            },
            {
              name: 'Acros 3'
            }
          ]
        },
        {
          name: 'Axor',
          subItems: [
            {
              name: 'Axor 1'
            },
            {
              name: 'Axor 2'
            },
            {
              name: 'Axor 3'
            }
          ]
        },
        {
          name: 'Atego',
          subItems: [
            {
              name: 'Atego 1'
            },
            {
              name: 'Atego 2'
            },
            {
              name: 'Atego 3'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.drawer {
  margin-top: 8px;
}
.search-field {
  margin-bottom: 4px;
  position: relative;
  img {
    position: absolute;
    right: 4%;
    top: 32%;
  }
  input {
    border-radius: 0px !important;
  }
}
.category {
  font-family: 'PT Sans', sans-serif;
  font-size: 28px;
}
.card {
  border: none;
  border-radius: 0px;
}
.collapse {
  box-shadow: inset 0px -1px 0px 0px rgba(204, 204, 204, 1);
}
.arrowActive {
  transition: all 0.3s ease-in-out;
  transform: rotate(180deg);
}
.row {
  cursor: pointer;
}
</style>
