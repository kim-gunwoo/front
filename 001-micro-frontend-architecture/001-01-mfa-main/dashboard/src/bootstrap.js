import { createApp } from "vue";
import Dashboard from "./components/Dashboard.vue";

const mount = (el) => {
  // const app = createApp(Dashboard);
  // console.log(app)
  // app.mount(el);

  el.innerHTML = '<div>fasfsfadfa</div>';
};

// 개발 환경일 경우 아래를 실행한다.
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_dashboard-dev-root");
  
  if (devRoot) {
    mount(devRoot);
  }
}

export { mount };
