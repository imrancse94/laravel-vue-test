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
import { ref,onMounted } from 'vue'
import { useStore } from 'vuex'
import {useRouter} from 'vue-router'

export default {
   
	setup () {
        const store = useStore()
        const router = useRouter()
        let title= ref("");
        let subjectlist = ref({});
        let errors = ref({});

		function logout() {
            store.dispatch("auth/logout");
            router.push({ name: "login" });
        }

        function setTitle() {
            let user = store.getters["auth/getUser"].user;
            title.value = user.name;
            if (title.value) {
                title.value = `Welcome ${title.value}`;
            }
        }

       async function  getSubjects() {
           let user = store.getters["auth/getUser"].user;
           let response = await store.dispatch("subject/getSubjectById", {
                id: user.id,
            });
            if('data' in response){
                subjectlist.value = response.data.data;
            }
            
        }
		onMounted(() => {
            setTitle();
            getSubjects();
		})
		
		return {
            title,
            subjectlist,
            errors,
            logout
        };
	}
}
</script>
