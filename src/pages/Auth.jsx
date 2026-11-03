
export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const submit = e => {
    e.preventDefault();
    const clean = email.trim().toLowerCase();

    if (clean === 'admin@drivenow.com' && password === 'admin123') {
      setCurrentUser({
        name: 'Administrator',
        email: clean,
        role: 'admin'
      });
      navigate('/admin');
      return;
    }

    const user = getUsers().find(
      u => u.email === clean && u.password === password
    );

    if (!user) {
      setMessage('Invalid email or password.');
      return;
    }

    setCurrentUser({
      name: user.name,
      email: user.email,
      role: 'user'
    });

    navigate('/dashboard');
  };

  return (
    <AuthShell title="Welcome back" subtitle="Login to continue to DriveNow.">
      <form onSubmit={submit}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />

        <button className="btn btn-red full" type="submit">
          Login
        </button>

        <p className="message">{message}</p>
      </form>

      <p className="auth-bottom">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </AuthShell>
  );
}
