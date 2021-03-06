<template>
<div>
  <page-header />
  <div class="stylists-page">
    <div class="tp-bigcontainer">
      <h1 class="tp-pagetitle">Stylist</h1>
      <div class="content-page">
        <div class="stylists">
          <div class="stylist-item" v-for="stylist in stylists" :key="stylist.id">
            <div class="avata-info">
              <figure><router-link :to="{ name: 'stylist', params: { id: stylist.id } }"><img :src="stylist.avatar_url"></router-link></figure>
              <div class="info">
                <h2><router-link :to="{ name: 'stylist', params: { id: stylist.id } }">{{ stylist.name }}</router-link></h2>
                <div class="salon-name" v-if="stylist.salon">{{ stylist.salon.name }}</div>
                <div class="rate">
                  <div class="tp-rate">
                    <stars :rating="stylist.average_rating">
                      <div class="number" v-if="stylist.average_rating">{{ stylist.average_rating | numberFormat('0.0') }} - {{ stylist.rating_summary }}</div>
                    </stars>
                    <div class="rate-status">{{ stylist.review_count }} Đánh giá</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="images">
              <!-- Thay images-stylist-id bằng id (images-stylist-123) của stylist để dùng thư viện fancybox -->
              <figure><a data-fancybox="images-stylist-id" href="../assets/images/image-stylists-big.jpg"><img src="../assets/images/image-stylists.jpg"></a></figure>
              <figure><a data-fancybox="images-stylist-id" href="../assets/images/image-stylists-big-2.jpg"><img src="../assets/images/image-stylists-2.jpg"></a></figure>
              <figure><a data-fancybox="images-stylist-id" href="../assets/images/image-stylists-big.jpg"><img src="../assets/images/image-stylists.jpg"></a></figure>
              <figure><a data-fancybox="images-stylist-id" href="../assets/images/image-stylists-big-2.jpg"><img src="../assets/images/image-stylists-2.jpg"></a></figure>
            </div>
          </div>
        </div>

        <infinite-loading
          @infinite="onInfinite"
          spinner="waveDots"
          ref="infiniteLoading">
          <span slot="no-more">
            {{ $t('search.no_more_results') }}
          </span>
          <span slot="no-results">
            {{ $t('search.no_more_results') }}
          </span>
        </infinite-loading>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { merge } from 'lodash'
import { parseSearchQuery } from '@/utils/mixins'
import InfiniteLoading from 'vue-infinite-loading'
import PageHeader from './layout/Header'
import Stars from './partials/StarRating'

export default {
  name: 'Stylists',
  components: {
    PageHeader,
    Stars,
    InfiniteLoading
  },
  mixins: [parseSearchQuery],
  metaInfo: {
    title: 'Stylists'
  },
  mounted () {
    this.setSearchData()
  },
  beforeRouteLeave (to, from, next) {
    this.$store.dispatch('clearSearchQuery').then(() => next())
  },
  watch: {
    '$route': 'setSearchData'
  },
  data () {
    return {
      stylists: [],
      meta: {
        pagination: {
          current_page: 0,
          total_pages: 0
        }
      }
    }
  },
  methods: {
    fetchData (query, cb, errCb) {
      let params = this.$route.query
      params._meta = 1
      params.limit = 6
      params = merge(query, params)
      this.$http.get('search/stylists', { params })
        .then(response => cb(response))
        .catch(error => errCb ? errCb(error) : null)
    },
    onInfinite ($state) {
      this.fetchData({ page: parseInt(this.meta.pagination.current_page) + 1 }, ({ data }) => {
        this.stylists = this.stylists.concat(data.data)
        this.meta = data.meta
        if (data.data.length) {
          $state.loaded()
        } else {
          $state.complete()
        }
      })
    }
  }
}
</script>
