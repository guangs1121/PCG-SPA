import Vue from 'vue';
import Router from 'vue-router';
import HomeView from './views/HomeView.vue';
import OwnerList from './components/OwnerList.vue';
import OwnerForm from './components/OwnerForm.vue';
import LandHoldingList from './components/LandHoldingList.vue';
import LandHoldingForm from './components/LandHoldingForm.vue';
import UploadFile from './components/UploadFile.vue';

Vue.use(Router);

const routes = [
  { path: '/', component: HomeView },
  { path: '/owners', component: OwnerList },
  { path: '/owners/new', component: OwnerForm },
  { path: '/owners/edit/:id', component: OwnerForm },
  { path: '/landholdings', component: LandHoldingList },
  { path: '/landholdings/new', component: LandHoldingForm },
  { path: '/landholdings/edit/:id', component: LandHoldingForm },
  { path: '/upload', component: UploadFile }
];

const router = new Router({
  routes
});

export default router;
