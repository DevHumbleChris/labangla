<template>
  <div class="LoadSpinner text-center flex">
    <flower-spinner
      :animation-duration="2500"
      :size="170"
      color="#212f67"
    />
    <div class="font-bold">
      LABANGLA
    </div>
  </div>
</template>

<script>
import { FlowerSpinner } from 'epic-spinners'

export default {
  name: 'LoadSpinner',
  components: {
    FlowerSpinner
  }
}
</script>

<style lang="scss">
.LoadSpinner {
  margin: auto;
  width: 20rem;
  margin-top: 15%;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media screen and (max-width: 320px) {
    margin-top: 65%;
    width: 18rem;
  }
  @media screen and (min-width: 320px) {
    margin-top: 65%;
  }
  @media screen and (min-width: 420px) {
    margin-top: 55%;
  }
  @media screen and (min-width: 600px) {
    margin-top: 40%;
  }
  @media screen and (min-width: 720px) {
    margin-top: 35%;
  }
  @media screen and (min-width: 800px) {
    margin-top: 30%;
  }
  @media screen and (min-width: 1000px) {
    margin-top: 15%;
  }
}
</style>
