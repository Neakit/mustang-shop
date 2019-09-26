<template>
    <div class="container">
        <div class="row header align-items-center">
            <!-- logo -->
            <div class="col-sm-3 col-md-3 col-lg-5 my-2">
                <div class="row justify-content-center justify-content-sm-start">
                    <div class="logo-wrap">
                        <p class="logo-title">auto</p>
                        <p class="logo-sub">mustang</p>
                    </div>
                </div>
            </div>
            <!-- address -->
            <div class="my-2 ml-auto col-sm-4 col-md-4 col-lg-3">
                <div class="align-items-center justify-content-center address-wrap">
                    <img
                        src="/images/icons/map-icon.svg"
                        class="map-logo d-sm-none d-md-block"
                    />
                    <div class="address">
                        <p class="address-title">Москва, Ленинградское шоссе, 238</p>
                        <!-- <p class="address-subtitle">Показать на карте</p> -->
                    </div>
                </div>
            </div>
            <!-- phone -->
            <div class="my-2 col-sm-6 col-md-4 col-lg-3">
                <div class="align-items-center justify-content-center phone-wrap">
                    <img
                        src="/images/icons/phone-icon.svg"
                        class="phone-logo d-sm-none d-md-block"
                    />
                    <div class="phone">
                        <p class="phone-title">8 925 502-33-10</p>
                        <p class="phone-subtitle">info@auto-mustang.ru</p>
                    </div>
                </div>
            </div>
            <!-- social-icons -->
            <div class="social-wrap my-2col-1">
                <div class="justify-content-around justify-content-sm-between">
                    <img src="/images/icons/whatsapp.png" alt="social-icon" />
                    <img src="/images/icons/viber.png" alt="social-icon" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.logo-wrap {
  p {
    font-size: 18px;
    text-transform: uppercase;
    color: #212121;
    margin-left: 20px;
  }
  .logo-title {
    font-family: 'Gilroy Light', sans-serif;
    letter-spacing: 20px;
  }
  .logo-sub {
    font-family: 'Gilroy Bold', sans-serif;
    letter-spacing: 4px;
  }
}
.phone-wrap,
.address-wrap {
  flex-wrap: nowrap;
}
.address,
.phone {
  height: 62px;
  min-width: 180px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
}
.map-logo {
  margin-right: 28px;
  margin-left: 14px;
  margin-bottom: 4px;
  margin-top: 4px;
}
.phone-logo {
  margin-right: 10px;
  margin-left: 14px;
  margin-bottom: 4px;
  margin-top: 4px;
}
.address-title {
  font-family: 'PT Sans', sans-serif;
  font-size: 14px;
  line-height: 1;
}
.address-subtitle {
  font-size: 14px;
  color: #ee6056;
  cursor: pointer;
}
.phone-title {
  font-family: 'PT Sans', sans-serif;
  font-size: 14px;
  line-height: 1;
  font-weight: 600;
}
.phone-subtitle {
  font-size: 12px;
}
</style>
