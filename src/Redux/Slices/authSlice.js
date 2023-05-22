import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Cookies from 'universal-cookie';
import axios from 'axios'

const cookie = new Cookies()
const initialState = {
    token: cookie.get('token') || "",
    user: cookie.get('user')? cookie.get('user'): {},
    photo: cookie.get('photo')? cookie.get('photo'): "",
    status: "",
    error: "",
    isLoggedIn: cookie.get('isLoggedIn') || false
}

export const loginUser = createAsyncThunk("auth/loginUser",
        async(form, {rejectWithValue})=> {
            try {
                const res = await axios.post("https://strapi-4yf5.onrender.com/api/auth/local",
                {
                    identifier: form.name,
                    password: form.password
                })
                return res.data;
            } catch (error) {
                return rejectWithValue(error);
            }

})
export const uploadPhoto = createAsyncThunk("auth/uploadPhoto",
        async({id, file}, {rejectWithValue})=> {
            const formData = new FormData()
            formData.append({ref: "plugin::users-permissions.user", refId: id, field: "photo", files: file})
            try {
                const res = await fetch("https://strapi-4yf5.onrender.com/api/upload",{
                    body: formData
                })
                return res.data;
            } catch (error) {
                return rejectWithValue(error);
            }
})
export const registerUser = createAsyncThunk("auth/registerUser",
        async(form, {rejectWithValue})=> {
            try {
                const res = await axios.post(https://strapi-4yf5.onrender.com/api/auth/local/register",
                {
                    username: form.name,
                    email: form.email,
                    password: form.password,
                })
                return res.data;
            } catch (error) {
                return rejectWithValue(error);
            }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: state => {
        state.token = ''
        cookie.remove("token")
        state.user = {}
        cookie.remove("user")
        state.isLoggedIn = false
        cookie.remove("isLoggedIn")
    }
  },
  extraReducers: builder => {
    builder
    //registerUser
    .addCase(registerUser.pending, state=> {
        state.status = "pending"
    })
    .addCase(registerUser.fulfilled,(state, {payload})=> {
        state.status = "fulfilled"
        state.user = payload.user
    })
    .addCase(registerUser.rejected, (state, {payload})=> {
        state.status = "rejected"
        state.error = payload.response.data.error.message
    })
    //loginUser
    .addCase(loginUser.pending, state=> {
        state.status = "pending"
    })
    .addCase(loginUser.fulfilled,(state, {payload})=> {
        state.token = payload.jwt
        cookie.set("token", state.token)
        state.user = payload.user
        console.log("🚀 ~ file: authSlice.js:77 ~ .addCase ~ payload.user:", payload.user)
        cookie.set("user", state.user)
        state.isLoggedIn = true
        cookie.set("isLoggedIn", state.isLoggedIn)
    })
    .addCase(loginUser.rejected, (state, {payload})=> {
        state.status = "rejected"
        state.error = payload.response.data.error.message
    })
    //uploadPhoto
    .addCase(uploadPhoto.pending, state=> {
        state.status = "pending"
    })
    .addCase(uploadPhoto.fulfilled,(state, {payload})=> {
        state.photo = payload
        // cookie.set("photo", state.photo)
        console.log("🚀 ~ file: authSlice.js:77 ~ .addCase ~ payload:", payload)
    })
    .addCase(uploadPhoto.rejected, (state, {payload})=> {
        state.status = "rejected"
        state.error = payload
        console.log("🚀 ~ file: authSlice.js:77 ~ .addCase ~ payload:", payload)
    })
  }
});

export const {logoutUser} = authSlice.actions

export default authSlice.reducer
