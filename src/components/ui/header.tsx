import { AnimatePresence, motion } from "framer-motion";

import { useEffect, useState } from "react";
import { HalfMoonIcon } from "../icons/half-moon-icon";
import { LargeLogoIcon } from "../icons/large-logo-icon";

const Navbar = ({
	pathname,
}: {
	pathname: string;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

	// Fermer le menu lorsque la route change
	useEffect(() => {
		setIsOpen(false);
		setActiveDropdown(null);
	}, []);

	// Désactiver le défilement quand le menu est ouvert
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
		return () => {
			document.body.style.overflow = "auto";
		};
	}, [isOpen]);

	const navLinks = [
		{ href: "#", label: "Services", match: "/services", hasDropdown: true },
		{
			href: "/a-propos",
			label: "À propos",
			match: "/a-propos",
			hasDropdown: false,
		},
		{
			href: "/contact",
			label: "Contact",
			match: "/contact",
			hasDropdown: false,
		},
	];

	const services = [
		{
			href: "/services/identite-visuelle",
			label: "Identité visuelle",
		},
		{
			href: "/services/supports-imprimes",
			label: "Supports print",
		},
		{
			href: "/services/supports-web",
			label: "Supports web",
		},
		{
			href: "/services/pack-medias",
			label: "Pack médias sociaux",
		},
	];

	const toggleDropdown = (index: number) => {
		if (activeDropdown === index) {
			setActiveDropdown(null);
		} else {
			setActiveDropdown(index);
		}
	};

	// Variants pour les animations
	const menuVariants = {
		closed: {
			opacity: 0,
			transition: {
				staggerChildren: 0.05,
				staggerDirection: -1,
			},
		},
		open: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		closed: {
			opacity: 0,
			y: 50,
		},
		open: {
			opacity: 1,
			y: 0,
		},
	};

	const dropdownVariants = {
		closed: {
			height: 0,
			opacity: 0,
			transition: {
				duration: 0.3,
			},
		},
		open: {
			height: "auto",
			opacity: 1,
			transition: {
				duration: 0.5,
			},
		},
	};

	return (
		<>
			{/* Header fixe */}
			<header className="fixed top-0 left-0 right-0 z-40 bg-background border-b-1 border-foreground">
				<div className="flex justify-center items-center text-sm md:text-base p-4 gap-2 bg-secondary text-foreground hover:underline rounded-b-lg cursor-pointer font-medium">
					<HalfMoonIcon size={6} />
					<p className="uppercase">Réserver un appel découverte avec Jolilot</p>
				</div>
				<div className="container mx-auto px-4 py-6 flex justify-between items-center">
					{/* Logo */}

					<a className="flex items-center gap-2 z-50 relative" href="/">
						<LargeLogoIcon />
					</a>

					{/* Bouton burger avec animation */}
					<motion.button
						className="flex flex-col justify-center items-center w-10 h-10 z-50 relative"
						onClick={() => setIsOpen(!isOpen)}
						aria-label="Menu"
					>
						<motion.span
							className="block w-8 h-0.5 bg-foreground mb-1.5"
							animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
							transition={{ duration: 0.3 }}
						/>
						<motion.span
							className="block w-8 h-0.5 bg-foreground mb-1.5"
							animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
							transition={{ duration: 0.3 }}
						/>
						<motion.span
							className="block w-8 h-0.5 bg-foreground"
							animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
							transition={{ duration: 0.3 }}
						/>
					</motion.button>
				</div>
			</header>

			{/* Menu plein écran avec animation */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						className="fixed inset-0 bg-background z-30 flex flex-col justify-center items-center pt-20"
						initial="closed"
						animate="open"
						exit="closed"
						variants={menuVariants}
					>
						<div className="container mx-auto px-4 flex flex-col items-center">
							<nav className="w-full max-w-lg">
								<motion.ul className="flex flex-col gap-8 items-center">
									{navLinks.map((link, index) => (
										<motion.li
											// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
											key={index}
											className="w-full"
											variants={itemVariants}
										>
											<div className="relative w-full text-center">
												{link.hasDropdown ? (
													<button
														onClick={() => toggleDropdown(index)}
														className={`flex items-center text-foreground text-2xl uppercase py-2 relative w-full justify-center ${
															pathname.startsWith(link.match)
																? "font-semibold"
																: "font-normal"
														}`}
														type="button"
													>
														{pathname.startsWith(link.match) && (
															<span className="inline-flex mr-2">
																<HalfMoonIcon size={6} />
															</span>
														)}
														<span className="hover:underline transition-all duration-300">
															{link.label}
														</span>
													</button>
												) : (
													<a
														href={link.href}
														className={`flex items-center text-foreground text-2xl uppercase py-2 relative w-full justify-center ${
															pathname.startsWith(link.match)
																? "font-semibold"
																: "font-normal"
														}`}
													>
														{pathname.startsWith(link.match) && (
															<span className="inline-flex mr-2">
																<HalfMoonIcon size={6} />
															</span>
														)}
														<span className="hover:underline transition-all duration-300">
															{link.label}
														</span>
													</a>
												)}

												{/* Dropdown animé */}
												{link.hasDropdown && (
													<AnimatePresence>
														{activeDropdown === index && (
															<motion.div
																className="overflow-hidden w-full"
																variants={dropdownVariants}
																initial="closed"
																animate="open"
																exit="closed"
															>
																<ul className="py-4">
																	{services.map((service, serviceIndex) => (
																		<motion.li
																			// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
																			key={serviceIndex}
																			variants={itemVariants}
																			initial={{ opacity: 0, y: 20 }}
																			animate={{ opacity: 1, y: 0 }}
																			exit={{ opacity: 0, y: 20 }}
																			transition={{ delay: serviceIndex * 0.1 }}
																		>
																			<a
																				href={service.href}
																				className={`block py-3 text-xl hover:text-accent transition-colors duration-300 ${
																					pathname === service.href
																						? "font-semibold"
																						: "font-normal"
																				}`}
																			>
																				{service.label}
																			</a>
																		</motion.li>
																	))}
																</ul>
															</motion.div>
														)}
													</AnimatePresence>
												)}
											</div>
										</motion.li>
									))}

									{/* Projets inclus dans la navigation plein écran */}
									<motion.li
										className="w-full text-center"
										variants={itemVariants}
									>
										<a
											href="https://www.instagram.com/jolilotatelier/"
											target="_blank"
											rel="noopener noreferrer"
											aria-label="Instagram"
											className="inline-block font-semibold text-accent hover:underline text-2xl uppercase py-2"
										>
											Projets
										</a>
									</motion.li>
								</motion.ul>
							</nav>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Ajout d'un espace pour éviter que le contenu principal soit caché sous le header fixe */}
			<div className="h-[168px] w-2" />
		</>
	);
};

export default Navbar;
