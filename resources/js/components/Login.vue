<template>
    <div>
        <main class="login-form">
            <div class="cotainer">
                <div class="row justify-content-center">
                    <div class="col-md-8">
                        <div class="card">
                            <div class="card-header">Login</div>
                            <form action="" method="">
                                
                                <div class="card-body">
                                    <div class="alert alert-danger text-center" v-if="message">
                                    {{ message }}
                                </div>
                                    <div class="form-group row">
                                        <label
                                            for="email_address"
                                            class="col-md-4 col-form-label text-md-right"
                                            >E-Mail Address</label
                                        >
                                        <div class="col-md-6">
                                            <input
                                                type="text"
                                                id="email_address"
                                                class="form-control"
                                                v-model="email"
                                                :class="{'is-invalid': errors.email}"
                                                required
                                            />
                                            <div v-if="errors.email" class="invalid-feedback d-block">{{errors.email}}</div>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label
                                            for="password"
                                            class="col-md-4 col-form-label text-md-right"
                                            >Password</label
                                        >
                                        <div class="col-md-6">
                                            <input
                                                type="password"
                                                id="password"
                                                class="form-control"
                                                name="password"
                                                v-model="password"
                                                required
                                                :class="{'is-invalid': errors.password}"
                                            />
                                            <div v-if="errors.password" class="invalid-feedback d-block">{{errors.password}}</div>
                                        </div>
                                    </div>

                                    <div class="col-md-6 offset-md-4">
                                        <button
                                            @click="login()"
                                            type="button"
                                            class="btn btn-primary"
                                        >
                                            Login
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import { ref} from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
    props: {
        email: String, 
        password: String, 
    },
    setup(props, { emit }) {
        const store = useStore();
        const router = useRouter();
        // let email = "";
        // let password = "";
         let errors = ref({});
         let message = ref("");
        
        async function login() {
            let email = props.email;
            let password = props.password;
            // console.log("user_email", user_email);
            // console.log("user_password", user_pass);
            
            const response = await store.dispatch("auth/login", {
                email,
                password,
            });
            //console.log("ddd", response);
            if (response.success) {
                router.push({ name: "dashboard" });
            } else {
                if (response.statuscode == "E105") {
                    message.value = response.message;
                }

                if ("data" in response) {
                    errors.value = response.data;
                }
            }
            
        }

        return {
            login,
            message,
            errors
        }
    }
    
};
</script>
