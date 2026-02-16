import { createContext, useContext, useState } from 'react';
import { type ReactNode } from 'react';

interface DatabaseWidgetContextType {
  isEnabled: boolean;
  enableWidget: () => void;
  disableWidget: () => void;
}

const DatabaseWidgetContext = createContext<DatabaseWidgetContextType | undefined>(undefined);

export function DatabaseWidgetProvider({ children }: { children: ReactNode }) {
  const [isEnabled, setIsEnabled] = useState(false);

  const enableWidget = () => setIsEnabled(true);
  const disableWidget = () => setIsEnabled(false);

  return (
    <DatabaseWidgetContext.Provider value={{ isEnabled, enableWidget, disableWidget }}>
      {children}
    </DatabaseWidgetContext.Provider>
  );
}

export function useDatabaseWidget() {
  const context = useContext(DatabaseWidgetContext);
  if (!context) {
    throw new Error('useDatabaseWidget must be used within DatabaseWidgetProvider');
  }
  return context;
}