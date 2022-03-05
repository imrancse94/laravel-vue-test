<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light navbar-laravel">
            <div class="container">
                <a class="navbar-brand" href="#">{{ title }}</a>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div
                    class="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <a @click.prevent="logout" class="nav-link" href="#"
                                >Logout</a
                            >
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="container">
            <h2>Subject List</h2>

            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th class="text-center">ID</th>
                        <th class="text-center">Name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr :key="index" v-for="(subject,index) in subjectlist">
                        <td class="text-center">{{subject.id}}</td>
                        <td class="text-center">{{subject.name}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import { removeToken } from "./../Helper";
export default {
    data() {
        return {
            title: "",
            subjectlist: {},
            errors: {},
        };
    },
    mounted() {
        this.setTitle();
        this.getSubjects();
    },
    methods: {
        logout() {
            this.$store.dispatch("auth/logout");
            this.$router.push({ name: "login" });
        },

        setTitle() {
            let user = this.$store.getters["auth/getUser"].user;
            this.title = user.name;
            if (this.title) {
                this.title = `Welcome ${this.title}`;
            }
            console.log("this.title", this.$store);
        },

       async getSubjects() {
            let user = this.$store.getters["auth/getUser"].user;
           let response = await this.$store.dispatch("subject/getSubjectById", {
                id: user.id,
            });
            if('data' in response){
                this.subjectlist = response.data.data;
            }
           // console.log("response",  this.subjectlist);
        },
    },
};
</script>
