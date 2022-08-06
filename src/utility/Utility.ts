export async function triggerAnimationOnClick(htmlElement: HTMLElement, classname: string) {
  //Necessary to correctly manage the animation on multi-clicks
  await htmlElement.classList.remove(classname);
  htmlElement.classList.add(classname);
}

export async function copyToClipboard(iconElement: HTMLElement, elId: string) {
  if (iconElement) {
    triggerAnimationOnClick(iconElement, 'icon-click');
  }
  const cb = navigator.clipboard;
  const htmlElement = document.getElementById(elId);
  //Necessary to avoid a bug
  htmlElement?.focus();
  try {
    //for now we have only these 2 tags, if more will be added move to a switch case
    if (htmlElement?.tagName.toUpperCase() === 'SPAN') {
      await cb.writeText(htmlElement.innerText);
    } else {
      await cb.writeText((<HTMLTextAreaElement>htmlElement)?.value);
    }
    triggerAlert('success', 'Text copied to clipboard');
  } catch (err) {
    triggerAlert('danger', 'Failed to copy: ' + err);
  }
}

export function triggerAlert(type: string, message: string) {
  let timer: number;
  const alertContainer = document.createElement('div');
  alertContainer.innerText = message;

  let classes = 'alert w-fit-content fade show position-fixed bottom-0';
  switch (type) {
    default:
      classes = classes.concat(' alert-primary');
      timer = 1000;
      break;
    case 'success':
      classes = classes.concat(' alert-success');
      timer = 500;
      break;
    case 'danger':
      classes = classes.concat(' alert-danger');
      timer = 1000;
      break;
    case 'warning':
      classes = classes.concat(' alert-warning');
      timer = 1000;
      break;
  }
  alertContainer.setAttribute('class', classes);
  alertContainer.setAttribute('style', 'left: 1rem; z-index: 10000; max-width: calc(100vw - 2rem);');
  alertContainer.setAttribute('role', 'alert');

  document.body.appendChild(alertContainer);

  setTimeout(function () {
    alertContainer.classList.remove('show');
    alertContainer.classList.add('hide');
  }, timer);
}
