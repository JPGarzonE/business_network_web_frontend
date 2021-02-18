<script context="module">
  export async function preload(page, session) {
    const selectRolePath = '/company/select-role';

    // Verify if the company has alredy selected its role.
    if( session.authenticated ) {
      const company = session.company;
      const path = page.path;
      
      if( company && !company.is_buyer && !company.is_supplier && 
          ( path !== selectRolePath && path !== selectRolePath + '/' )
        ) {
        return this.redirect(302, selectRolePath);
        // Putting the endpoint directly from the GetRoute function in 
        // company/select-role throws i18n locale error.
      }
      
    }
  }
</script>

<script>
  import * as sapper from '@sapper/app';
  import { refreshSession } from '../store/store.js';
  import AuthService from '../services/authentication/auth.service.js';

  const authService = new AuthService();
  const { session } = sapper.stores();

  session.subscribe(value => {
    if( typeof window !== 'undefined' ) {
      if( value.accessToken && value.refreshToken ) {
        authService.setSession({
          tokens: {
            access: value.accessToken,
            refresh: value.refreshToken
          }
        });
      }
    }
  });

  refreshSession.subscribe(value => {
    if( value.accessToken )
      $session.accessToken = value.accessToken;
    if( value.refreshToken )
      $session.refreshToken = value.refreshToken;
  });
</script>

<main id="main">
  <slot />
</main>

<style>
  main {
    height: 100%;
  }
  :global(.noScroll) {
    overflow-y: hidden;
  }
</style>
