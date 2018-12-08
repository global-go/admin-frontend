<template>
  <div class="wrapper">
    <div class="mask" @click="close"></div>
    <div class="content">
      <div class="box1">
        <img
          :src="user.avatar"
          style="height:200px;width:200px;margin-left:10%;margin-top:10%;"
        >
      </div>
      <div class="box2">
        <div class="text2">账号 {{user.id}}</div>
        <div class="text2">昵称：{{user.nickname}}</div>
        <div class="text2">
          密码：
          <input
            v-model="password"
            placeholder="请输入新密码..."
            style="width:200px;height:32px;margin-left:-2%;"
          >
        </div>
        <div class="text2">账户余额：RMB {{user.balance.toFixed(2)}}</div>
        <div class="text2">
          <div>修改余额：</div>
          <input
            v-model="balance"
            placeholder="输入余额..."
            style="width:120px;height:32px;margin-left:-2%;"
          >
        </div>
      </div>
      <div class="box3">
        <div class="confirm_modify" @click="modify()">确认修改</div>
      </div>
    </div>
  </div>
</template>



<script>
import urls from "@/apis/urls";
export default {
  name: "ModifyUserInfo",
  data() {
    return {
      password: "",
      balance: ""
    };
  },
  props: ["user","index"],
  methods: {
    close() {
      this.$emit("close");
    },
    async modify() {
     
      if (this.password.trim() !== "" && this.balance.trim() !== "") {
        const result = await this.axios({
          method: "put",
          url: urls.modify(this.user.id),
          data: {
            token: this.$store.state.token,
            userInfo: {
              password: this.password,
              balance: parseFloat(this.balance)
            }
          }
        });
        this.$store.commit("modifybalance", {
          balance: result.data.user.balance,
          index:this.index
        });
      }else if(this.password.trim() !== ""){
        const result = await this.axios({
          method: "put",
          url: urls.modify(this.user.id),
          data: {
            token: this.$store.state.token,
            userInfo: {
              password: this.password,
            }
          }
        });
      }else if(this.balance.trim() !== "") {
        const result = await this.axios({
          method: "put",
          url: urls.modify(this.user.id),
          data: {
            token: this.$store.state.token,
            userInfo: {
              balance: parseFloat(this.balance)
            }
          }
        });
        this.$store.commit("modifybalance", {
          balance: result.data.user.balance,
          index:this.index
        });
      }
      this.$emit("close");
    }
  }
};
</script>



<style scoped>
.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
.wrapper > .mask {
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  animation: fadeIn 0.5s ease 1 backwards;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0%);
  }
}
.content {
  position: absolute;
  overflow-y: auto;
  right: 0px;
  top: 0px;
  width: 30vw;
  height: 100vh;
  background-color: white;
  animation: slideIn 0.5s ease 1 backwards;
}
.box1 {
  background-color: #e5e5e5;
  width: 93%;
  margin-left: 7%;
  margin-top: 8%;
  text-align: left;
  padding-top: 1%;
  height: 35vh;
  display: flex;
}
.box2 {
  background-color: #e5e5e5;
  width: 93%;
  margin-left: 7%;
  margin-top: 8%;
  text-align: left;
  padding-top: 2%;
  height: 45vh;
}

.text2 {
  font-size: 30px;
  font-weight: bold;
  color: #505050;
  margin-top: 5%;
  margin-left: 5%;
  display: flex;
  align-items: center;
}
.box3 {
  height: 250px;
  width: 100%;
  text-align: center;
}
.confirm_modify {
  width: 200px;
  height: 70px;
  background-color: #ffc300;
  margin-top: 8%;
  margin-left: auto;
  margin-right: auto;
  font-size: 25px;
  font-weight: bold;
  color: black;
  line-height: 70px;
}
.confirm_modify:hover {
  background-color: black;
  color: white;
  transition-duration: 0.8s;
  cursor: pointer;
}
</style>