<script>
    import ContactUsButton from '../../components/ContactUsButton/ContactUsButton.svelte';

    export let message = '';
    export let background = '#0757C6';
    export let textColor = '#FFFFFF';
    export let contactPhone = "573187541301";

    const contactLink = `https://wa.me/${contactPhone}`;
</script>

<style>
    .ContactSection, .ContactSection-content, .ContactSection-buttons {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .ContactSection {
        min-height: 369px;
        padding: 53px 30px;
    }
    .ContactSection-content {
        max-width: 475px;
    }
    .ContactSection-message {
        margin-bottom: 36px;
        font-size: 2.25em;
        font-family: var(--landing-title-font);
        font-weight: normal;
        line-height: 45px;
        letter-spacing: 0.216px;
        text-align: center;
    }
    .ContactSection-message, .ContactSection-buttons {
        width: 100%;
    }

    @media screen and (min-width: 850px) {
        .ContactSection {
            min-height: 240px;
            padding: 56px;
        }
        .ContactSection-message {
            margin-bottom: 15px;
        }
    }
</style>

<div class="ContactSection" style="background:{background}">

    <div class="ContactSection-content">
        <p class="ContactSection-message" style="color:{textColor}">
            {message}
        </p>
    
        <div class="ContactSection-buttons">
            <slot name="ContactButton">
                <ContactUsButton
                    buttonAction={() => {window.open(contactLink, "_blank")}}
                >
                </ContactUsButton>
            </slot>
        </div>
    </div>
    
</div>