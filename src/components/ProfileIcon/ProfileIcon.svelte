<script>
    const defaultImage = "/images/profile_icon.svg";

    export let logoSrc = defaultImage;

    logoSrc = logoSrc ? logoSrc: defaultImage;
</script>

<style>
    .ProfileIcon {
        width: 51px;
        height: 51px;
        background-color: white;
        border-radius: 100%;
    }

    .ProfileIcon-image {
        width: 100%;
        height: 100%;
        border-radius: inherit;
    }
</style>

<div class="ProfileIcon">
    <img src={logoSrc} alt="ProfileIcon" class="ProfileIcon-image">
</div>