
export default function homeLayout({
    children
  }: {children: React.ReactNode}) {
    return (
        <div>
            im head 
          {children}
          im footer
        </div>
    );
  }