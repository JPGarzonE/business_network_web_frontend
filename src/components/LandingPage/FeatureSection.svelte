<script>
    export let title;
    export let subtitle;
    export let textColor;
    export let background = 'var(--white)';
    export let backgroundPosition;

    backgroundPosition = background ? backgroundPosition : null;
    const BackgroundPositionStyle  = backgroundPosition ? 
        `background-position:${backgroundPosition}` 
        : 
        '';
</script>

<style>
    .FeatureSection{
        width: 100%;
        min-height: 585px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .FeatureSection-content {
        width: 100%;
        max-width: 566px;
        height: 100%;
        display: flex;
        flex-direction: column;
        margin: 60px 23px 15px 30px;
    }
    .FeatureSection-title, .FeatureSection-subtitle {
        color: inherit;
        letter-spacing: 0.216px;
    }
    .FeatureSection-title {
        margin-bottom: 40px;
        line-height: 45px;
        font-size: 2.25em;
        font-family: var(--landing-title-font);
        font-weight: bold;
    }
    .FeatureSection-subtitle {
        font-size: 1.13em;
        line-height: 21px;
    }
    .FeatureSection-text {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .FeatureSection-multimedia {
        display: flex;
        justify-content: center;
    }

    @media screen and (min-width: 425px) {
        .FeatureSection-content {
            margin: 60px 35px 15px 40px;
        }
    }

    @media screen and (min-width: 850px) {
        .FeatureSection {
            min-height: 611px;
        }
        .FeatureSection-content {
            max-width: 1063px;
            flex-direction: row;
            margin: 77px 65px 32px;
        }
        .FeatureSection-text, .FeatureSection-multimedia {
            width: 50%;
        }
        .FeatureSection-title {
            margin-bottom: 18px;
        }
    }

    @media screen and (min-width: 1000px) {
        .FeatureSection-title {
            font-size: 3em;
            line-height: 60px;
            max-width: 450px;
        }
        .FeatureSection-subtitle {
            max-width: 430px;
        }
    }

    @media screen and (min-width: 1175px) {
        .FeatureSection-content {
            margin: 77px 152px 32px;
        }
    }
</style>

<div class="FeatureSection"
    style="background:{background};{BackgroundPositionStyle}"
>
    <div class="FeatureSection-content">

        <div class="FeatureSection-text" style="color:{textColor}">
            <h2 class="FeatureSection-title">{title}</h2>
            <p class="FeatureSection-subtitle">{subtitle}</p>
        </div>
    
        <div class="FeatureSection-multimedia">
            <slot name="FeatureMultimedia"></slot>
        </div>

    </div>
</div>