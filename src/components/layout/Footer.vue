<template>
<footer class="footer">
  <div class="tp-container">
    <div class="savetime-footer">
      <h3>{{ $t('home.footer.do_you_know') }}</h3>
      <p>{{ $t('home.footer.do_you_know_detail') }}</p>
      <div class="full"></div>
      <div class="copyright">
        &copy;BZONE 2017
      </div>
    </div>
    <div class="instagram">
      <ul>
        <li v-for="(media, i) in instagram" :key="media.id" v-if="i < 9">
          <a :href="media.link"
            target="_blank"
            :title="media.caption.text"
            :alt="media.caption.text"><img :src="media.images.low_resolution.url">
          </a>
        </li>
      </ul>
    </div>
    <div class="links">
      <div class="title">
        Links
      </div>
      <ul class="list-link">
        <li>
          <router-link :to="{ name: 'about' }">{{ $t('home.footer.about_us') }}</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'faq' }">{{ $t('home.footer.common_questions') }}</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'partner' }">{{ $t('home.footer.bzone_for_bussiness') }}</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'contact' }">{{ $t('home.footer.contact') }}</router-link>
        </li>
      </ul>
      <div class="full"></div>
      <ul class="social">
        <li>
          <a href="https://www.facebook.com/Bzone.vn" target="_blank"><i class="bz-facebook"></i></a>
        </li>
        <li>
          <a href="https://www.instagram.com/bzone.vn" target="_blank"><i class="bz-instagram"></i></a>
        </li>
      </ul>
    </div>
    <div class="copyright bottom">
      ©Abby 2017
    </div>
  </div>
</footer>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Footer',
  computed: mapState({
    instagram: state => state.preloadData.instagram || []
  })
}
</script>
