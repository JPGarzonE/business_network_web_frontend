<script>
    import ProfileIcon from "../ProfileIcon/ProfileIcon.svelte";
    import ArrowCollapseRight from "svelte-material-icons/ArrowCollapseRight.svelte";
    import ChevronDown from "svelte-material-icons/ChevronDown.svelte";

    export let logoSrc;
</script>

<style>

</style>

<div class="ProfileIconMenu">
    <div class="ProfileIconMenu-icon">
        <ProfileIcon imageSrc={logoSrc} />
        <ChevronDown />
    </div>
    <div class="ProfileIconMenu-dropdown" style="display:none;">
        <div class="ProfileIconMenu-option">
            <span>Salir</span>
            <ArrowCollapseRight size=15 color="#DADADA" />
        </div>
    </div>
</div>