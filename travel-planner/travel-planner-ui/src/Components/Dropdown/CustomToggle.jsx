export default CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
	<a
		href=""
		ref={ref}
		onClick={(e) => {
			e.preventDefault();
			onClick(e);
		}}
	>
		{children}
		&#x25bc;
	</a>
));
