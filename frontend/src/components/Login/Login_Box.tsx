const Login_Box = () => {
    const submitHandler = ()=>{

    }
    const handleChange = ()=>{

    }
    const mode="night"
  return (
    <div className={`${mode}-mode loginBox`}>
       <form onSubmit={submitHandler}>
        <input 
           type="email"
           name="email"
           placeholder='example@gmail.com'
           onChange={handleChange}
           required
           className=''
        />

        <input 
           type="password"
           name="password"
           placeholder='Min 8 Characters'
           onChange={handleChange}
           required
        />
       </form>
    </div>
  )
}

export default Login_Box
