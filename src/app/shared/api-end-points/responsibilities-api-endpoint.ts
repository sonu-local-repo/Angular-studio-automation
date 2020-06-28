import { API_URL_DOMAIN } from '@shared/configs/globals';

export const RESPONSIBILITY_API = {
  getAllResponsibilities(){
    return `${API_URL_DOMAIN}/omt/responsibility/all`;
  },

  getResponsibilityById(id: number){
    return`${API_URL_DOMAIN}/omt/responsibility/${id}`
  },

  getAllViews(){
    return `${API_URL_DOMAIN}/screens/views-screen/all`;
  },
  getAllViewsByRepId(id: number){
    return `${API_URL_DOMAIN}/screens/views/resp/${id}`;
  },
  createRespView(id: number) {
    console.log(typeof id);
    return `${API_URL_DOMAIN}/screens/assoc/view/resp/${id}`;
  },
  updateResViewPermission(){
    return `${API_URL_DOMAIN}/screens/views/resp`;
  },
  createView() {
    return `${API_URL_DOMAIN}/screens/view/create`;
  },
  deleteViewAssociation(id: number) {
    return `${API_URL_DOMAIN}/screens/view/delete/${id}`;
  },
  createResponsibilityUrl() {
    return `${API_URL_DOMAIN}/omt/responsibility/create`;
  }
}
