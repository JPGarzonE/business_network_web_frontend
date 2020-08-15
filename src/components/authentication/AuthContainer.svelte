<style>
    .AuthContainer{
        max-width: 650px;
        min-height: 600px;
        width: 100%;
        height: auto;
        position: relative;
        top: 0;
        right: 0;
        left: 0;
        bottom: auto;
        margin: 1.5rem;
        padding: 4em 2.5em 5em;
        border: 1.5px solid var(--principal-color);
        border-radius: 5px;
    }

    .AuthContainer-logo-container{
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        margin: 0 auto;
    }

    .AuthContainer-logo-container figure{
        width: 140px;
        margin: 0 auto;
    }

    .AuthContainer-logo {
        width: 100%;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
    }

    .AuthContainer-footer{
		width: 100%;
		display: flex;
		justify-content: center;
		position: absolute;
		bottom: 0;
		left: 0;
		margin-bottom: 10px;
		text-transform: uppercase;
		color: var(--light-color);
		font-size: 15px;
	}

	@media screen and (min-width: 1000px){
        .AuthContainer{
            position: relative;
            width: 35%;
            padding: 5em 2.5em 5em;
        }
    }

    @media screen and (min-width: 1270px){
        .AuthContainer{
            padding: 4em 4.5em 5em;
        }
    }
</style>

<div class="AuthContainer">
    <div class="AuthContainer-logo-container">
        <figure>
            <img src="/images/logo.png" class="AuthContainer-logo" alt="logo" />
        </figure>
    </div>
    <slot />
    <div class="AuthContainer-footer">
        &copy; Conecty 2020
    </div>
</div>