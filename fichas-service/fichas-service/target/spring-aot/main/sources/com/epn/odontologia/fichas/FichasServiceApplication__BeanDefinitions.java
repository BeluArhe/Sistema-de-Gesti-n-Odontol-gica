package com.epn.odontologia.fichas;

import org.springframework.aot.generate.Generated;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.support.RootBeanDefinition;

/**
 * Bean definitions for {@link FichasServiceApplication}.
 */
@Generated
public class FichasServiceApplication__BeanDefinitions {
  /**
   * Get the bean definition for 'fichasServiceApplication'.
   */
  public static BeanDefinition getFichasServiceApplicationBeanDefinition() {
    RootBeanDefinition beanDefinition = new RootBeanDefinition(FichasServiceApplication.class);
    beanDefinition.setInstanceSupplier(FichasServiceApplication::new);
    return beanDefinition;
  }
}
