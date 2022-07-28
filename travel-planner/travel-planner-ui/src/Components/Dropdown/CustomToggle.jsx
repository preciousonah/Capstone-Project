import { forwardRef } from "react";

const CustomToggle = forwardRef(({ children, onClick }, ref) => (
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

export default CustomToggle;
