<script>
  export let onboardingStep;
  export let onboardingOn;
  export let handleCancel;
  export let handleNext;
  export let handlePrev;
  export let changeStep;
  export let onboardingStepMobile;
  export let data;
  let width;
  import Modal from "../../components/Modal.svelte";
  import ProgressButtons from "../../components/ProgressButtons/ProgressButtons.svelte";

  import {
    OnboardingWelcome,
    OnboardingSecondStep,
    OnboardingThirdStep,
    OnboardingFourthStep,
    OnboardingFifthStep,
    OnboardingWelcomeMobile,
    OnboardingSecondStepMobile,
    OnboardingSecondStepMobile2,
    OnboardingThirdStepMobile,
    OnboardingFourthStepMobile,
    OnboardingFifthStepMobile,
  } from "./index";
</script>

<svelte:window bind:innerWidth={width} />

{#if onboardingOn}
  {#if width > 850}
    {#if onboardingStep == 0}
      <Modal>
        <OnboardingWelcome {handleCancel} {handleNext} />
      </Modal>
    {:else if onboardingStep == 1}
      <Modal>
        <OnboardingSecondStep {handleCancel} {handleNext} supplier={data} />
        <ProgressButtons numberOfButtons={4} active={0} {changeStep} />
      </Modal>
    {:else if onboardingStep == 2}
      <Modal>
        <OnboardingThirdStep {handleCancel} {handleNext} {handlePrev} />
        <ProgressButtons numberOfButtons={4} active={1} {changeStep} />
      </Modal>
    {:else if onboardingStep == 3}
      <Modal>
        <OnboardingFourthStep {handleCancel} {handleNext} {handlePrev} />
        <ProgressButtons numberOfButtons={4} active={2} {changeStep} />
      </Modal>
    {:else}
      <Modal>
        <OnboardingFifthStep {handleCancel} {handleNext} {handlePrev} />
        <ProgressButtons numberOfButtons={4} active={3} {changeStep} />
      </Modal>
    {/if}
  {:else if onboardingStepMobile == 0}
    <Modal>
      <OnboardingWelcomeMobile {handleCancel} {handleNext} />
    </Modal>
  {:else if onboardingStepMobile == 1}
    <Modal>
      <OnboardingSecondStepMobile {handleCancel} {handleNext} />
      <ProgressButtons numberOfButtons={5} active={0} {changeStep} />
    </Modal>
  {:else if onboardingStepMobile == 2}
    <Modal>
      <OnboardingSecondStepMobile2 {handleCancel} {handleNext} {handlePrev} />
      <ProgressButtons numberOfButtons={5} active={1} {changeStep} />
    </Modal>
  {:else if onboardingStepMobile == 3}
    <Modal>
      <OnboardingThirdStepMobile {handleCancel} {handleNext} {handlePrev} />
      <ProgressButtons numberOfButtons={5} active={2} {changeStep} />
    </Modal>
  {:else if onboardingStepMobile == 4}
    <Modal>
      <OnboardingFourthStepMobile {handleCancel} {handleNext} {handlePrev} />
      <ProgressButtons numberOfButtons={5} active={3} {changeStep} />
    </Modal>
  {:else}
    <Modal>
      <OnboardingFifthStepMobile {handleCancel} {handleNext} {handlePrev} />
      <ProgressButtons numberOfButtons={5} active={4} {changeStep} />
    </Modal>
  {/if}
{/if}
