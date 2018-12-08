<template>
  <div class="cart">
    <div class="bar1">
      <img class="logo" src="../assets/logo.png">
      <SearchBar placeholder="搜索用户..." @search="search"></SearchBar>
    </div>
    <div class="bar2">
      <img class="user-photo" src="../assets/photo.png">
      <div class="user-message">
        <div class="user-name">系统管理员</div>
        <div class="exit" @click="back()">退出</div>
      </div>
    </div>
    <table>
      <tr>
        <th>用户账号</th>
        <th>管理用户信息</th>
        <th>管理员权限设置</th>
        <th>删除该用户</th>
      </tr>
      <tr class="commodity" v-for="(user, index) in thisPage" :key="user.id">
        <td>{{ user.id }}</td>
        <td class="click" @click="GoToDetail(index)">查看</td>
        <td v-if="user.type==='sysAdmin'">系统管理员</td>
        <td v-else-if="user.type==='admin'" class="click" @click="modifyAdminType(index)">取消管理员</td>
        <td v-else class="click" @click="modifyUserType(index)">设置管理员</td>
        <td v-if="user.type==='sysAdmin'" >不可操作</td>
        <td v-else class="click" @click="deleteUser(index)">删除</td>
      </tr>
    </table>
    <ChangePage
      :pageCount="pageCount"
      v-model="page"
      style="width:100%;position:fixed;bottom:30px;"
    ></ChangePage>
    <ModifyUserInfo @close="close" v-if="detail===true" :user="selectedUser" :index="selectedIndex"></ModifyUserInfo>
  </div>
</template>

<script>
import ModifyUserInfo from "@/components/ModifyUserInfo.vue";
import ChangePage from "@/components/ChangePage.vue";
import SearchBar from "../components/SearchBar";
import urls from "@/apis/urls";
export default {
  name: "",
  props: ["content"],
  data() {
    return {
      detail: false,
      page: 1,
      selectedUser: {},
      selectedIndex: 0,
      searchKey: ""
    };
  },
  components: {
    ModifyUserInfo,
    ChangePage,
    SearchBar
  },
  computed: {
    searchDataWrapper() {
      if (this.searchKey === "") {
        return this.users;
      } else {
        return this.users.filter(v => {
          return v.id.indexOf(this.searchKey) !== -1;
        });
      }
    },
    users() {
      return this.$store.state.users;
    },
    thisPage() {
      return this.searchDataWrapper.slice((this.page - 1) * 16, this.page * 16);
    },
    pageCount() {
      return Math.ceil(this.searchDataWrapper.length / 16);
    },
    token() {
      return this.$store.state.token;
    }
  },

  async mounted() {
    let users = [];
    const result = await this.axios({
      method: "get",
      url: urls.userInfo,
      params: {
        token: this.token
      }
    });
    // try {
    //   let result = await this.axios.get(urls.userInfo, {
    //     params: {
    //       token: this.$store.state.userInfo.token
    //     }
    //   })
    // }catch (err) {
    //   console.log(err);
    // }
    users = result.data.users;
    console.log(users);
    this.$store.commit("setUserList", users);
  },

  methods: {
    back() {
      this.$router.push({
        path: "/"
      });
    },
    GoToDetail(index) {
      this.selectedUser = this.thisPage[index];
      this.selectedIndex = index;
      this.detail = true;
    },
    close() {
      this.detail = false;
    },
    async modifyAdminType(index) {
      this.selectedUser = this.thisPage[index];
      const result = await this.axios({
        method: "put",
        url: urls.modify(this.selectedUser.id),
        data: {
          token: this.token,
          userInfo: {
            type: "user"
          }
        }
      });
      this.$store.commit("modifytype", {
        type: result.data.user.type,
        index: index
      });
    },
    async modifyUserType(index) {
      this.selectedUser = this.thisPage[index];
      const result = await this.axios({
        method: "put",
        url: urls.modify(this.selectedUser.id),
        data: {
          token: this.token,
          userInfo: {
            type: "admin"
          }
        }
      });
      this.$store.commit("modifytype", {
        type: result.data.user.type,
        index: index
      });
    },
    async deleteUser(index) {
      this.selectedUser = this.thisPage[index];
      const result = await this.axios({
        method: "delete",
        url: urls.modify(this.selectedUser.id),
        params: {
        token: this.token
      }
      });
      this.$store.commit("deleteuser",{
        index: index
      })
    },
    search(e) {
      this.searchKey = e;
    }
  }
};
</script>

<style scoped>
.bar1 {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.logo {
  height: 80px;
  width: 220px;
  margin-top: 20px;
  margin-left: 40px;
}

.bar2 {
  display: flex;
}

.user-photo {
  display: inline-block;
  height: 120px;
  width: 120px;
  padding: 30px 10px 10px 10px;
  margin-left: 5%;
  margin-right: 20px;
  border-bottom: 2px;
  border-bottom-style: solid;
  border-bottom-color: rgba(255, 141, 26, 1);
}

.user-message {
  padding: 30px 0;
  display: flex;
  margin-top: 40px;
}

.user-name {
  font-size: 24px;
  font-weight: bold;
  text-align: left;
  color: rgba(56, 56, 56, 1);
}

.exit {
  font-size: 15px;
  color: rgba(255, 141, 0, 1);
  text-decoration: underline;
  margin-top: 7px;
  margin-left: 12px;
}

.exit:hover {
  cursor: pointer;
}

table {
  margin-top: 30px;
  border-collapse: collapse;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}

table th,
table td {
  margin: 0;
  border: 0.5px solid #c6c6c6;
  text-align: center;
  vertical-align: middle;
}

table tr:nth-child(odd) {
  background-color: #f0f0f0;
}

.click:hover {
  cursor: pointer;
  color: rgba(255, 141, 0, 1);
  text-decoration: underline;
}

.form {
  height: 50px;
  border-radius: 5px 0px 0px 5px;
  border: none;
  display: flex;
  justify-content: center;
  align-content: center;
  margin-top: 30px;
  margin-right: 80px;
}

input {
  width: 40vw;
  font-size: 20px;
  padding-left: 8px;
  border: 1px solid rgb(229, 229, 229);
}
</style>
