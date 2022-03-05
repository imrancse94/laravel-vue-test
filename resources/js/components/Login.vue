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
export default {
    data() {
        return {
            email: "",
            password: "",
            errors: {},
            message: "",
        };
    },
    methods: {
        async login() {
            let email = this.email;
            let password = this.password;
            const response = await this.$store.dispatch("auth/login", {
                email,
                password,
            });
            if (response.success) {
                this.$router.push({ name: "dashboard" });
            } else {
                
                if(response.statuscode == "E105"){
                    this.message = response.message;
                } 

                if('data' in response){
                    this.errors = response.data;
                }
            }
            console.log("ddd", response,this.errors);
        },
    },
};
</script>
