<script context="module">
    export async function preload(page, session) {
        if( session.authenticated ) {
            return this.redirect(301, `profile/${session.username}`);
        }else {
            return this.redirect(301, 'login');
        }
    }
</script>