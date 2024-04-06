'use client';

import {
  DialogClose as BaseDialogClose,
  DialogContent as BaseDialogContent,
  DialogDescription as BaseDialogDescription,
  DialogFooter as BaseDialogFooter,
  DialogHeader as BaseDialogHeader,
  DialogTitle as BaseDialogTitle,
  DialogTrigger as BaseDialogTrigger,
  Dialog,
} from '@/components/ui/dialog';
import {
  DrawerClose as BaseDrawerClose,
  DrawerContent as BaseDrawerContent,
  DrawerDescription as BaseDrawerDescription,
  DrawerFooter as BaseDrawerFooter,
  DrawerHeader as BaseDrawerHeader,
  DrawerTitle as BaseDrawerTitle,
  DrawerTrigger as BaseDrawerTrigger,
  Drawer,
} from '@/components/ui/drawer';
import { useMediaQuery } from '@react-hook/media-query';
import * as React from 'react';

type ResponsiveOnAnimationEnd = React.AnimationEventHandler<HTMLDivElement> & ((open: boolean) => void);

const ResponsiveContext = React.createContext({ isDesktop: true });

interface ResponsiveDialogContentProps extends React.ComponentProps<typeof BaseDialogContent> {
  title?: string;
  description?: string;
  onAnimationEnd?: ResponsiveOnAnimationEnd;
}

const ResponsiveDialog: React.FC<React.ComponentProps<typeof Dialog>> = ({ children, ...props }) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const contextValue = React.useMemo(() => ({ isDesktop }), [isDesktop]);
  const [open, setOpen] = React.useState(false);

  return (
    <ResponsiveContext.Provider value={contextValue}>
      {isDesktop ? (
        <Dialog {...props} open={open} onOpenChange={setOpen}>
          {children}
        </Dialog>
      ) : (
        <Drawer {...props} open={open} onOpenChange={setOpen}>
          {children}
        </Drawer>
      )}
    </ResponsiveContext.Provider>
  );
};

const useResponsiveContext = () => {
  const context = React.useContext(ResponsiveContext);
  if (!context) {
    throw new Error('useResponsiveContext must be used within a ResponsiveDialog');
  }
  return context;
};

const ResponsiveDialogTrigger: React.FC<React.ComponentProps<typeof BaseDialogTrigger>> = ({ children, ...props }) => {
  const { isDesktop } = useResponsiveContext();
  return isDesktop ? <BaseDialogTrigger {...props}>{children}</BaseDialogTrigger> : <BaseDrawerTrigger {...props}>{children}</BaseDrawerTrigger>;
};

const ResponsiveDialogContent: React.FC<ResponsiveDialogContentProps> = ({ title, description, onAnimationEnd, children, ...props }) => {
  const { isDesktop } = useResponsiveContext();

  return isDesktop ? (
    <BaseDialogContent {...props} className="responsive-dialog">
      <BaseDialogHeader>
        {title && <BaseDialogTitle>{title}</BaseDialogTitle>}
        {description && <BaseDialogDescription>{description}</BaseDialogDescription>}
      </BaseDialogHeader>
      {children}
    </BaseDialogContent>
  ) : (
    <BaseDrawerContent {...props}>
      <BaseDrawerHeader>
        {title && <BaseDrawerTitle>{title}</BaseDrawerTitle>}
        {description && <BaseDrawerDescription>{description}</BaseDrawerDescription>}
      </BaseDrawerHeader>
      <div className="px-4">{children}</div>
    </BaseDrawerContent>
  );
};

const ResponsiveDialogTitle: React.FC<React.ComponentProps<typeof BaseDialogTitle>> = ({ children, ...props }) => {
  const { isDesktop } = useResponsiveContext();
  return isDesktop ? <BaseDialogTitle {...props}>{children}</BaseDialogTitle> : <BaseDrawerTitle {...props}>{children}</BaseDrawerTitle>;
};

const ResponsiveDialogDescription: React.FC<React.ComponentProps<typeof BaseDialogDescription>> = ({ children, ...props }) => {
  const { isDesktop } = useResponsiveContext();
  return isDesktop ? <BaseDialogDescription {...props}>{children}</BaseDialogDescription> : <BaseDrawerDescription {...props}>{children}</BaseDrawerDescription>;
};

const ResponsiveDialogFooter: React.FC<React.ComponentProps<typeof BaseDialogFooter>> = ({ children, ...props }) => {
  const { isDesktop } = useResponsiveContext();
  return isDesktop ? (
    <BaseDialogFooter {...props}>{children}</BaseDialogFooter>
  ) : (
    <BaseDrawerFooter {...props} className="-mx-4 flex-col-reverse">
      {children}
    </BaseDrawerFooter>
  );
};

const ResponsiveDialogClose: React.FC<React.ComponentProps<typeof BaseDialogClose>> = ({ children, ...props }) => {
  const { isDesktop } = useResponsiveContext();
  return isDesktop ? <BaseDialogClose {...props}>{children}</BaseDialogClose> : <BaseDrawerClose {...props}>{children}</BaseDrawerClose>;
};

export { ResponsiveDialog, ResponsiveDialogClose, ResponsiveDialogContent, ResponsiveDialogDescription, ResponsiveDialogFooter, ResponsiveDialogTitle, ResponsiveDialogTrigger };
